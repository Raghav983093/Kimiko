// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { IFactory } from "../interfaces/IFactory.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { Lib } from "../Lib.sol";
import { Common } from "./Common.sol";
import { IBuyer } from "../interfaces/IBuyer.sol";

contract BuyerV1 is Common, IBuyer {
    using Lib for *;

    // Errors
    error QuantityShouldBeGreaterThanZero(uint8);
    error CallerNotTheCustomer(address);
    error TransferCommitmentFailed();
    error OrderWasAccepted(uint);
    error QuantityCannotBeZero(uint24);
    error RequestedQuantityExceedAvailableQuantity(uint24 requested, uint24 expected);

    // Platform fee in %
    uint8 public feePercentage;

    /**
     * @notice Contract identifier
     * We use it to identify which contract is calling in the factory contract.
     */
    bytes32 immutable interfaceId;

    constructor(
        IFactory _factory, 
        IERC20 _uSDT, 
        address _roleBasedManager
    ) 
        Common(_factory, _uSDT, _roleBasedManager) 
    {
        feePercentage = 50; // 0.05%
        interfaceId = keccak256(abi.encodePacked("BUYER"));
    }

    /** ------> PUBLIC FUNCTIONS <-------  */

    function setFeePercentage(uint8 newFeePercentage) public onlyRoleStatus("Buyer: Not the owner") returns (bool) {
        feePercentage = newFeePercentage;
        return true;
    }

    /**
     * @dev Buyer makes order for a specific good item showing they're interest indeed.
     * Note: Buyers maintain an internal wallet created automatically for them on signUp.
     * Buyer should give approval to spend before executing this function.
     * @param itemId : Item Id.
     * @param requestedQuantity : Quantity of item user wants to negotiate for.
     * @param offerPrice: The Price buyer is willing to pay per unit of listed item.
     * @param  destinationAddr: Address where item should be dispatched if order goes well.
     * @param contact: Buyer's contract i.e phone/email. Can be concatenate.
     * 
     * Note: While placing order, the buyer make commitment in full amount of the weighted offerPrice and qty.
     */
    function startOrder(
        uint24 requestedQuantity,
        uint itemId,
        uint offerPrice,
        string memory destinationAddr,
        string memory contact
    ) 
        public 
        validateIds(itemId, 0, false)
    {
        (uint allowance, uint24 initialQty) = _initialCheck(_wrappedFactory().getItem(itemId), _msgSender(), requestedQuantity, offerPrice);
        unchecked {
            _wrappedFactory().placeOrder(
                IFactory.Order(
                    requestedQuantity, 
                    uint32(block.timestamp), 
                    offerPrice, 
                    allowance,
                    _msgSender(), 
                    IFactory.Stage.COMMIT,
                    IFactory.Info(destinationAddr.toBytes(), contact.toBytes()),
                    address(0)
                ), 
                itemId,
                initialQty - requestedQuantity
            );
        }
        if(!IERC20(uSDT).transferFrom(_msgSender(), address(this), allowance)) revert TransferCommitmentFailed();
    }

    /**
     * @dev Edit order.
     * @param newQuantity : New quantity.
     * @param itemId: Item index.
     * @param newOfferPrice : New offer price.
     * @param orderId : Position of order in the list/Order index.
     */
    function editOrder(
        uint24 newQuantity,
        uint itemId,
        uint newOfferPrice,
        uint orderId
    ) 
        public
        validateIds(itemId, orderId, true)
        returns(bool)
    {
        (IFactory.Item memory item, IFactory iFact) = _requireIsABuyer(itemId, orderId, _msgSender());
        if(item.info.orders[orderId].stage == IFactory.Stage.ACCEPTED) revert OrderWasAccepted(orderId);
        _checkOrderStage(item, orderId);
        (uint allowance,) = _initialCheck(item, _msgSender(), newQuantity, newOfferPrice);
        iFact.editOrder(newQuantity, itemId, orderId, newOfferPrice, allowance);
        return true;
    }

    /**
     * @dev Buyer cancels order.
     * @param itemId: Item index.
     * @param orderId : Position of order in the list/Order index.
     */
    function cancelOrder(
        uint itemId,
        uint orderId
    ) 
        public
        validateIds(itemId, orderId, true)
        returns(bool)
    {
        (IFactory.Item memory item, IFactory iFact) = _requireIsABuyer(itemId, orderId, _msgSender());
        // if(item.info.orders[orderId].stage == IFactory.Stage.CANCELLED) revert OrderAlreadyCancelled(orderId);
        _checkOrderStage(item, orderId);
        return iFact.cancelOrder(itemId, orderId);
    }


    /** ------> INTERNAL FUNCTIONS <-------  */

    function _requireIsABuyer(
        uint itemId, 
        uint negoId, 
        address caller
    ) 
        internal 
        view
        returns(IFactory.Item memory item, IFactory iFact) 
    {
        iFact = _wrappedFactory();
        item = iFact.getItem(itemId);
        if(item.info.orders[negoId].customer != caller) {
            revert CallerNotTheCustomer(caller);
        }
    }

    /**
     * @dev For buyer to interact with an order, the order stage must be in any of the following:
     *      - COMMIT, or
     *      - REJECTED, or
     *      - CANCELLED
     * @param orderId : Order Id.
     * @param item : item data
     */
    function _checkOrderStage(IFactory.Item memory item, uint orderId) internal pure {
        require(uint8(item.info.orders[orderId].stage) < 3, "Cannot cancel order at this time");
    }

    function _initialCheck(
        IFactory.Item memory item,
        address buyer, 
        uint24 requestedQuantity, 
        uint offerPrice
    ) 
        internal 
        view
        returns(uint allowance, uint24 initialQty) 
    {
        allowance = IERC20(uSDT).allowance(buyer, address(this));
        if(requestedQuantity == 0) revert QuantityCannotBeZero(requestedQuantity);
        if(requestedQuantity > item.info.quantity) revert RequestedQuantityExceedAvailableQuantity(requestedQuantity, uint24(item.info.quantity));
        initialQty = uint24(item.info.quantity);
        require(allowance >= offerPrice * requestedQuantity, "Factory: Allowance too low");
    }

    function _deductFee(
        uint amount, 
        address feeReceiver
    ) 
        internal 
        returns(uint balance) 
    {
        uint fee = amount.computeFee(feePercentage);
        unchecked {
            balance = amount - fee;
        }
        if(fee > 0) {
            _transferFee(fee, feeReceiver);
        }
    }

    /**
     * @dev Refunds Buyer their commitment. This happens when Sellers wish to remove their ADs
     * @param orders : Order struct data. See IFactory.Order.
     */
    function refund(
        IFactory.Order[] memory orders
    ) 
        external 
        onlyRoleStatus("Buyer: Only Seller contract is allowed")
        returns(bool)
    {
        for(uint i = 0; i < orders.length; i++) {
            if(orders[i].commitment > 0) {
                require(orders[i].stage == IFactory.Stage.COMMIT || orders[i].stage == IFactory.Stage.REJECTED, "Buyer: Blocked");
                approve(orders[i].customer, orders[i].commitment);
            }
        }
        return true;
    }

    /**
     * @dev Buyer pays seller. 
     * @notice Fee is deducted.
     * @param amount : Amount to pay.
     * @param seller : Seller's address.
     */
    function paySeller(
        uint amount, 
        address seller, 
        address feeReceiver
    ) 
        external 
        onlyRoleStatus("Buyer: Only Factory is allowed")
        returns(bool)
    {
        approve(seller, _deductFee(amount, feeReceiver));
        return true;
    }

    /**
     * @dev Buyer confirm receipt of goods. On confirmation, the trade is finalized 
     * and payment is released to the seller.
     * @param itemId : Item Id.
     * @param orderId : Order Id.
     */
    function confirmOnReceipt(
        uint itemId,
        uint orderId
    ) 
        public 
        validateIds(itemId, orderId, true)
        returns(bool) 
    {
        (, IFactory iFact) = _requireIsABuyer(itemId, orderId, _msgSender());
        iFact.signConfirmation(itemId, orderId, _msgSender());

        return true;
    }

    function getInterfaceId() external view returns(bytes32) {
        return interfaceId;
    }
}