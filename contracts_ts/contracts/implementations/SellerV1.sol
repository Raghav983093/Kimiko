// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { IFactory } from "../interfaces/IFactory.sol";
import { IBuyer } from "../interfaces/IBuyer.sol";
import { Lib } from "../Lib.sol";
import { Common } from "./Common.sol";
import { ISeller } from "../interfaces/ISeller.sol";

contract SellerV1 is ISeller, Common {
    using Lib for *;

    error InvalidStageSelector(uint8);
    error OrderResolved();
    error QuantityShouldBeGreaterThanZero(uint);

    event ItemAdded(IFactory.Item);

    address public buyerContract;

    /**
     * @notice Contract identifier
     * We use it to identify which contract is calling in the factory contract.
     */
    bytes32 immutable interfaceId;

    /**@dev Only Store owner function
     * @param itemId : item identifier or position in storage 
     */
    modifier isStoreOwner(uint itemId) {
        _wrappedFactory().getItem(itemId).seller.equalInAddress(_msgSender(), "OnlySeller is allowed");
        _;
    }

    constructor(
        IFactory _factory, 
        IERC20 _uSDT, 
        address _buyerContract,
        address _roleManager
    ) 
        Common(_factory, _uSDT, _roleManager) 
    {
        buyerContract = _buyerContract;
        interfaceId = keccak256(abi.encodePacked("SELLER"));
    }

    /**
     * @dev Add new Item to storeFront.
     * @param quantity : Quantity of item seller has to sell.
     * @param categorySelector : Main category of item.
     * @param priceLimit : Price per unit of item.
     * @param imageUrI : Image urI i.e IPFS link to uploaded images.
     * @param description : Item description.
     * @param location : Seller's location/address.
     */
    function listItem(
        uint8 quantity,
        uint8 categorySelector,
        uint priceLimit,
        string memory imageUrI,
        string memory description,
        string memory location
    ) 
        public 
        validateCategoryId(categorySelector) 
        returns(bool) 
    {
        if(quantity == 0) revert QuantityShouldBeGreaterThanZero(quantity);
        emit ItemAdded(
            _wrappedFactory().listNewItem(
                IFactory.AddItemParam(
                    quantity,
                    categorySelector,
                    priceLimit,
                    imageUrI,
                    description,
                    location,
                    _msgSender()
                )
            )
        );
        return true;
    }

    /**
     * @dev Removes item from storefront.
     * @param itemId : Item id
     */
    function removeItem(uint itemId) 
        public 
        validateIds(itemId, 0, false)
        isStoreOwner(itemId)
        returns(bool) 
    {
        IFactory iFact = _wrappedFactory();
        IFactory.Item memory item = iFact.getItem(itemId);
        if(item.info.orders.length > 0) {
            IBuyer(buyerContract).refund(item.info.orders);
        }
        iFact.removeItem(itemId);
        return true;
    }

    /**
     * @dev Move order to the next stage. Example: A seller can accept or
     * reject order but cannot cancel order i.e stage must not equal index 3. 
     * Only the buyer can cancel.
     * @param stageSelector : Stage selector should be in number since enums are index-based.
     * @param itemId : Item id/index/position.
     * @param orderId : Order id/index/position.
     */
    function acceptOrder(
        uint8 stageSelector,
        uint itemId, 
        uint orderId
    ) 
        public 
        validateIds(itemId, orderId, true)
        isStoreOwner(itemId)
        returns(bool) 
    {
        if(stageSelector >= 6 || stageSelector == 3) revert InvalidStageSelector(stageSelector);
        IFactory iFact = _wrappedFactory();
        IFactory.Item memory item = iFact.getItem(itemId);
        require(orderId < item.info.orders.length, "Invalid orderId");
        IFactory.Stage stage = item.info.orders[orderId].stage;
        if(stage == IFactory.Stage.CANCELLED || stage == IFactory.Stage.DELIVERED) revert OrderResolved();
        require(iFact.moveOrder(itemId, orderId, IFactory.Stage(stageSelector)), "Seller: Operation failed");
        if(IFactory.Stage(stageSelector) == IFactory.Stage.DELIVERED) {
            iFact.signConfirmation(itemId, orderId, _msgSender());
        }

        return true;
    }

    /**
     * @dev Edits price of an item.
     * @param itemId : Item index.
     * @param newPriceLimit : Latest price.
     */
    function editPriceLimit(
        uint itemId,
        uint newPriceLimit
    ) 
        external 
        validateIds(itemId, 0, false) 
        isStoreOwner(itemId) 
        returns (bool) 
    {
        _wrappedFactory().editPriceLimit(itemId, newPriceLimit);
        return true;
    }

    /**
     * Edit item quantity
     * @param itemId : Item index.
     * @param newQuantity : New Quantity
     */
    function editQuantity(
        uint24 newQuantity,
        uint itemId
    ) 
        public
        validateIds(itemId, 0, false) 
        isStoreOwner(itemId) 
        returns (bool) 
    {
        _wrappedFactory().editQuantity(newQuantity, itemId);
        return true;
    }

    function getInterfaceId() external view returns(bytes32) {
        return interfaceId;
    }
    
}
