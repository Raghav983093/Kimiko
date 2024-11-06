// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract TestUSDT is ERC20 {
    address public admin;
    constructor() ERC20("TestUSDT", "TUSDT") {
        admin = msg.sender;
        uint mintable = 200000 * (10**18);
        _mint(msg.sender, mintable);
    } 

    function mint(address to) public returns(bool) {
        require(msg.sender == admin, "Not permitted");
        uint mintable = 400000 * (10**18);
        _mint(to, mintable);
        return true;
    }
}