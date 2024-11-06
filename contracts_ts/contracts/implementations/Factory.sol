// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { IFactory } from "../interfaces/IFactory.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { Lib } from "../Lib.sol";
import { ICommon } from "../interfaces/ICommon.sol";
import { IBuyer } from "../interfaces/IBuyer.sol";
import { Pausable } from "../abstracts/Pausable.sol";

contract Factory is IFactory, Pausable {
    using Lib for *;

    // Stablecoin address
    IERC20 public uSDT;

    // Fee receiver
    address public feeTo;

    bytes32 public constant BUYER_ID = keccak256(abi.encodePacked("BUYER"));
    bytes32 public constant SELLER_ID = keccak256(abi.encodePacked("SELLER"));

    /**
     * @dev Array of storeItems
     * Note: For the purpose of testing and to quickly share data
     * to the frontend, we employ this pattern of storage. As the array 
     * grow in size, it may have huge impact on gas cost hence we plan to 
     * switch to a more cheaper storage type.
     */ 
    Item[] private storeFront;

    constructor(
        address _feeTo, 
        address _roleManager
    ) 
        Pausable(_roleManager) 
    {
        _feeTo.notEqualInAddress(address(0), "FeeReceiver is zero address");
        require(_feeTo != address(0), "Invalid FeeReceiver");
        feeTo = _feeTo;
    }

    // -------> INTERNAL FUNCTIONS <---------

    /**
     * @dev Only store owner function: Change price limit i.e lower price an item can be sold
     * @param itemId : Required: Item reference Id.
     * @param newQuantity : Required: New available quantity.
    */
    function _editQuantity(
        uint96 newQuantity,
        uint itemId
    ) internal {
        storeFront[itemId].info.quantity = newQuantity;
    }

    /**
     * @dev Returns item stored at 'itemId'
     * @param itemId : Item index 
     */
    function _getItem(uint itemId) 
        internal 
        view 
        returns(Item memory data) 
    {
        data = storeFront[itemId];
    }

    // function _pushItemToStorage(Item memory item) internal {
    //     storeFront.push(item);
    // }

    // -------> EXTERNAL FUNCTIONS <--------- 

    function getItem(uint itemId) external view returns(Item memory) {
        return _getItem(itemId);
    }

    function getStoreSize() external view returns(uint) {
        return storeFront.length;
    }

    /**
     * @dev Buyer-only Utility for editing or make changes to their order.
     * Buyers want to do this in the event of any of the following:
     *          - The Seller rejected their offer.
     *          - No response from the Seller.
     *          - They feel they've not given enough consideration.
     * @param itemId : Item id.
     * @param orderId : Order index.
     * @param newOfferPrice : New offered price.
     * @param newCommitment : Amount given as allowance. This would always be total cost of all selected items.
     */
    function editOrder(
        uint24 newQuantity,
        uint itemId,
        uint orderId,
        uint newOfferPrice,
        uint newCommitment
    )
        external
        whenNotPaused
        onlyRoleStatus("Factory: Only Buyer")
        returns(bool)
    {
        Order memory prev = storeFront[itemId].info.orders[orderId];
        _editQuantity(newQuantity, itemId);
        prev.quantity = newQuantity;
        prev.offerPrice = newOfferPrice;
        prev.commitment = newCommitment;
        storeFront[itemId].info.orders[orderId] = prev;
        return true;
    }

    /**
     * @dev Parties to trade sign document of completion.
     * @param itemId : Item Id.
     * @param orderId : Order Id.
     * @param party : Party signing i.e Buyer or Seller.
     * On completed signature, trade is finalized and the seller is paid.
     */
    function signConfirmation(
        uint itemId, 
        uint orderId, 
        address party
    ) 
        external 
        whenNotPaused
        onlyRoleStatus("Factory: Not Permitted")
        returns(bool)
    {
        Order memory neg = storeFront[itemId].info.orders[orderId];
        if(!neg.firstSigner.isZeroAddress()) {
            /** MsgSender at this point should be the Buyer so we can send callback */
            require(neg.firstSigner != party, "Party already signed");
            require(neg.stage == Stage.DELIVERED, "Goods not delivered");
            if(ICommon(_msgSender()).getInterfaceId() != BUYER_ID) revert OnlyBuyerCanConfirmDelivery();
            IBuyer(_msgSender()).paySeller(neg.commitment, neg.firstSigner, feeTo);
        } else {
            storeFront[itemId].info.orders[orderId].firstSigner = party;
        }

        return true;
    }

    /**
     * @dev Cancels order
     * @param itemId : Item index.
     * @param orderId : Order Id.
     */
    function cancelOrder(
        uint itemId, 
        uint orderId
    ) 
        external 
        returns(bool)
    {
        storeFront[itemId].info.orders[orderId].stage = Stage.CANCELLED;
        return true;
    }

    /**@dev Add item to storeFront
     * @param aip : Parameters struct
     */
    function listNewItem(
        AddItemParam memory aip
    ) 
        external 
        whenNotPaused
        onlyRoleStatus("Factory: Only Seller")
        returns(Item memory) 
    {
        uint itemId = storeFront.length;
        storeFront.push();
        storeFront[itemId].seller = aip.seller;
        storeFront[itemId].meta = ItemMetadata(Category(aip.categorySelector), abi.encode(aip.imageUrI));
        storeFront[itemId].info.quantity = aip.quantity;
        storeFront[itemId].info.id = itemId;
        storeFront[itemId].info.priceLimit = aip.priceLimit;
        storeFront[itemId].info.description = aip.description.toBytes();
        storeFront[itemId].info.location = aip.location.toBytes();

        return _getItem(itemId);
    }

    /**
     * @dev Adds new buyer information to item when commitment is made
     * @param order : Order data struct. 
     * @param itemId : Item id
     * @param newQuantity : New quantity to set.
     */
    function placeOrder(
        Order memory order, 
        uint itemId, 
        uint24 newQuantity
    ) 
        external 
        whenNotPaused
        onlyRoleStatus("Factory: Only Buyer")
        returns(bool) 
    {
        _editQuantity(newQuantity, itemId);
        storeFront[itemId].info.orders.push(order);
        return true;
    }

    /**
     * @dev Remove item from specified location.
     * This resets the slot to default value.
     * @param itemId : Item id
     */
    function removeItem(uint itemId) 
        external 
        whenNotPaused 
        onlyRoleStatus("Factory: Only Seller")
        returns(bool) 
    {
        delete storeFront[itemId];
        return true;
    }

    /**
     * @dev Seller moves order by approval or rejection.
     * @param itemId : Item index
     * @param orderId : Order index.
     * @param stage : Stage the order should be e.g Stage.ACCEPTED.
     */
    function moveOrder(
        uint itemId, 
        uint orderId,
        Stage stage
    )
        external 
        whenNotPaused
        onlyRoleStatus("Factory: Only Seller")
        returns(bool)
    {
        if(orderId >= storeFront[itemId].info.orders.length) revert InvalidOrderId(orderId);
        storeFront[itemId].info.orders[orderId].stage = stage;
        return true;
    }

    /**
     * @dev Seller change price of an item
     * @param itemId : Item id.
     * @param newPriceLimit : New price to effect .
     */
    function editPriceLimit(
        uint itemId,
        uint newPriceLimit
    ) 
        external 
        whenNotPaused
        onlyRoleStatus("Factory: Only Seller")
        returns (bool) 
    {
        storeFront[itemId].info.priceLimit = newPriceLimit;
        return true;
    }

    /**
     * @dev Edit Quantity of item that was previously listed by a seller.
     * @param newQuantity : New quatity
     * @param itemId : Item index
     */
    function editQuantity(
        uint24 newQuantity,
        uint itemId
    ) 
        external 
        whenNotPaused
        onlyRoleStatus("Factory: Only Seller")
        returns (bool) 
    {
        _editQuantity(newQuantity, itemId);
        return true;
    }


    // -------> VIEW/PURE/PUBLIC FUNCTIONS <---------

        /**
     * @dev Readonly: Return data from storage
     */
    function getData() public view returns(Item[] memory items) {
        items = storeFront;
        return items;
    }

}