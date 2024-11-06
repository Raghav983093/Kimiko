// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import { IRoleBased } from "../interfaces/IRoleBased.sol";
/**
 * @title MsgSender 
 * @author (Bobeu)
 * @notice Non-deployable contract simply returning the calling account.
 */
abstract contract MsgSender {
    function _msgSender() internal view returns(address sender) {
        sender = msg.sender;
    }
}

/**
 * @title RoleBased 
 * @author (Bobeu)
 * @notice Standalone contract for managing roleship in kimiko protocol.
 */
contract RoleBased is IRoleBased, MsgSender{
    /**
     * @notice Number of roles.
     */
    uint public rolesCount;

    /**
     * @notice Addresses with roleship permission.
     */
    
    mapping (address => bool) private _isRoleBased;

    /**
     * @notice Mapping of rolesCount to addresses.
     * A valid id will return a mapped role.
     */
    mapping (uint => address) public roles;

    /**
     * @dev Only role is allowed.
     */
    modifier onlyRoleStatus {
        require(_isRoleBased[_msgSender()], "Oop! Caller is not recognized");
        _;
    }

    constructor() {
        _setRole(_msgSender(), true);
    }

    /**
     * @dev Returns role variable.
     */
    function _getRole(uint roleId) 
        internal 
        view 
        returns(address _role) 
    {
        _role = roles[roleId];
    }

    /**
     * @dev Add or remove target address as role.
     * @param target: Target address.
     * @notice 'target' parameter must not be empty.
     */
    function _setRole(
        address target,
        bool add
    ) 
        private 
    {
        require(target != address(0), "Simplifi RoleBased: 'target' parameter is empty");
        add? (_isRoleBased[target] = true, rolesCount ++) : (_isRoleBased[target] = false, rolesCount --);
    }

    /**
     * @dev Add a new role address
     * @param newRoles: New roles
     * @notice Only address with role permission can add another role.
     */
    function setPermission(
        address[] memory newRoles
    ) 
        external
        onlyRoleStatus
        returns(bool) 
    {
        bool rt = true;
        for(uint r = 0; r < newRoles.length; r++) {
            _setRole(newRoles[r], rt);
        }
        return rt;
    }

    /**
     * @dev Remove an address as role.
     * @param target: Target address
     * @notice Only address with role permission can remove another role.
     */
    function removeRole(
        address target
    ) 
        external
        onlyRoleStatus
        returns(bool) 
    {
        _setRole(target, false);
        return true;
    }
    /**
     * @dev An role can renounce their roleship. This however will not leave the
     * contract empty without an role. There must be at least one role left.
     * @notice Only address with role permission can renounce roleship.
     */
    function renounceRole() 
        external
        onlyRoleStatus
        returns(bool) 
    {
        require(rolesCount > 1, "At least 2 roles is required for one to leave"); 
        _setRole(_msgSender(), false);
        return true;
    }

    /**
     * @dev Returns role variable.
     * Can be called externally by contracts.
     * @param roleId : Owner Id. 
     */
    function getRole(
        uint roleId
    ) 
        external 
        view 
        returns(address) 
    {
        return _getRole(roleId);
    }

    /**
     * @dev Check if target is an role.
     * @param target : Target address.
     */
    function hasRole(
        address target
    )
        external
        view 
        returns(bool) 
    {
        return _isRoleBased[target];
    }
}