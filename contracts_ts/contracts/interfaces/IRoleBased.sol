// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

/**
 * @title IRoleBased 
 * Interface of the RoleBased contract
 * @author Bobeu
 */
interface IRoleBased {
    function setPermission(
        address[] memory newRoles
    ) 
        external
        returns(bool);

    function removeRole(
        address target
    ) 
        external
        returns(bool);

    function renounceRole() 
        external
        returns(bool);

    function getRole(
        uint ownerId
    ) 
        external 
        view 
        returns(address);

    function hasRole(
        address target
    )
        external
        view 
        returns(bool);
}