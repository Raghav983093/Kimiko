// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { IFactory } from "../interfaces/IFactory.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { Lib } from "../Lib.sol";
import { Pausable } from "../abstracts/Pausable.sol";

abstract contract Common is Pausable {
    using Lib for *;

    // Errors
    error UnsupportedCategory(uint8);
    error InvalidItemId(uint);

    IFactory immutable factory;
    IERC20 public uSDT;

    /**
     * @notice In order to use 'categorySelector' with the enum Category, we must
     * ensure 'categorySelector' is not out of bound since enums are index based
     * just like an array. 
     * @param categorySelector : Category selector 
     */
    modifier validateCategoryId(uint8 categorySelector) {
        if(categorySelector >= 10) revert UnsupportedCategory(categorySelector);
        _;
    }

    /**
     * @dev Internal function : Validate store Id
     * @param itemId : Item id
     * @param orderId : Order id
     * @param includeOrderId : Boolean flag to validate order id or not.
    */
    modifier validateIds(
        uint itemId, 
        uint orderId, 
        bool includeOrderId
    ) 
    {
        if(itemId >= _wrappedFactory().getStoreSize()) revert InvalidItemId(itemId);
        if(includeOrderId) {
            orderId.assertLThan(_wrappedFactory().getItem(itemId).info.orders.length, "Invalid orderId");
        }
        _;
    }

    constructor(
        IFactory _factory,
        IERC20 _uSDT, 
        address _roleManager
    ) 
        Pausable(_roleManager)
    {
        address(_factory).notEqualInAddress(address(0), "_factory is undefined");
        factory = _factory;
        uSDT = _uSDT;
    }

    function _wrappedFactory() internal view returns(IFactory iFactory) {
        iFactory = IFactory(factory);
    } 

    function approve(address to, uint amt) internal {
        IERC20(uSDT).approve(to, amt);
    } 

    /**
     * @dev Transfer fee to fee receiver
     * @param amount : Amount to send.
     * @param feeReceiver : Recipient.
     */
    function _transferFee(uint amount, address feeReceiver) internal {
        IERC20(uSDT).transfer(feeReceiver, amount);
    }

}
