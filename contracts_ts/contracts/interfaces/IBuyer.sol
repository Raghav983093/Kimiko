// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { IFactory } from "./IFactory.sol";
import { ICommon } from "./ICommon.sol";

interface IBuyer is ICommon {
    function refund(IFactory.Order[] memory) external returns(bool);
    function paySeller(uint amount, address seller, address feeReceiver) external returns(bool);
}