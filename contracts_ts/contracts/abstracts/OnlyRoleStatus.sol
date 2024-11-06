// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import { MsgSender, RoleBased } from "../implementations/RoleBased.sol";
import { IRoleBased } from "../interfaces/IRoleBased.sol";

abstract contract OnlyRoleStatus is MsgSender {
    address public roleManager;

    constructor(address _roleManager)
    {
        _setRoleManager(_roleManager);
    }

    /**
     * @notice Caller must have owner role before execeution can proceed.
     * The 'errorMessage' argument can be used to return error specific to 
     * a context e.g function call. 
     * @param errorMessage : Custom error message
     */
    modifier onlyRoleStatus(string memory errorMessage) {
        address mgr = roleManager;
        require(mgr != address(0), "OnlyRoleStatus: Manager not set");
        require(IRoleBased(mgr).hasRole(_msgSender()), errorMessage);
        _;
    }

    function _setRoleManager(
        address newManager
    )
        private
    {
        roleManager = newManager;
    }

    /**
     * Set RoleManager
     * @param newManager : New manager address
     */
    function setRoleManager(
        address newManager
    )
        public
        onlyRoleStatus("OnlyRoleStatus: Not permitted")
        returns(bool)
    {
        _setRoleManager(newManager);
        return true;
    }
}