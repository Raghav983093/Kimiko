// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IFactory {
    enum Category { FASHION, ELECTRONICS, PHONESNTABLETS, FURNITURES, VEHICLES, ANIMALSNPETS, EQUIPMENTSNTOOLS, REPAIRNCONSTRUCTION, SOFTWARES, BABIESNKIDS }
    enum Stage { COMMIT, ACCEPTED, REJECTED, CANCELLED, INTRANSIT, DELIVERED }

    error UnsupportedCategory(uint8);
    error InvalidItemId();
    error InvalidOrderId(uint negoId);
    error OnlyBuyerCanConfirmDelivery();
    error NotTheRealNegotiator(address);
    error RequestedQuantityExceedAvailableQuantity(uint requested, uint expected);

    struct Item {
        address seller;
        ItemInfo info;
        ItemMetadata meta;
    }

    struct ItemInfo {
        uint quantity;
        uint id;
        uint priceLimit;
        bytes description;
        bytes location;
        Order[] orders;
    }

    struct ItemMetadata {
        Category category;
        bytes uri;
    }

    struct Order {
        uint24 quantity;
        uint32 date;
        uint offerPrice;
        uint commitment;
        address customer;
        Stage stage;
        Info info;
        address firstSigner;
    }

    struct Info {
        bytes destination;
        bytes contacts;
    }

    // -------> PARAMS <-------

    struct AddItemParam {
        uint8 quantity;
        uint8 categorySelector;
        uint priceLimit;
        string imageUrI;
        string description;
        string location;
        address seller;
    }

    function listNewItem(AddItemParam memory) external returns(Item memory) ;
    function placeOrder(Order memory order, uint itemId, uint24 newQuantity) external returns(bool);
    function getItem(uint itemId) external view returns(Item memory);
    function editPriceLimit(uint itemId, uint newPriceLimit) external returns (bool);
    function editOrder(
        uint24 newQuantity,
        uint itemId,
        uint orderId,
        uint newOfferPrice,
        uint newCommitment
    )
        external
        returns(bool);

    function editQuantity(uint24 newQuantity, uint itemId) external returns (bool);
    function getStoreSize() external view returns(uint);
    function removeItem(uint itemId) external returns(bool);
    function cancelOrder(uint itemId, uint orderId) external returns(bool);
    function signConfirmation(uint itemId, uint orderId, address party) external returns(bool);
    function moveOrder(
        uint itemId,
        uint orderId,
        Stage stage
    ) external returns(bool);

    event ItemRemoved(uint itemId, IERC20 asset);
}