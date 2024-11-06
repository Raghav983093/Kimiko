// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

library Lib {
    function isZeroAddress(address target) internal pure returns(bool _isZero) {
        _isZero = target == address(0);
    }

    function notEqualInAddress(address a, address b, string memory errorMessage) internal pure {
        require( a != b, errorMessage);
    }

    function equalInAddress(address a, address b, string memory errorMessage)internal pure {
        require( a == b, errorMessage);
    }

    function assertEqual(uint a, uint b, string memory errorMessage) internal pure {
        require( a == b, errorMessage);
    }

    function assertGThan(uint a, uint b, string memory errorMessage) internal pure {
        require( a > b, errorMessage);
    }

    function assertLThan(uint a, uint b, string memory errorMessage) internal pure {
        require( a < b, errorMessage);
    }

    function assertGThanOrEqual(uint a, uint b, string memory errorMessage) internal pure {
        require( a >= b, errorMessage);
    }

    function toBytes(string memory str) internal pure returns(bytes memory) {
        return abi.encode(str);
    }

    /**
     * Percentage base
     */
    function _getBase() internal pure returns(uint16 base) {
        base = 10000;
    }

    /**
        @dev Computes platform fee.
        @param makerRate : The amount of fee (in %) charged by the platform
            Note : Raw rate must multiply by 100 to get the expected value i.e
            if maker rate is 0.1%, it should be parsed as 0.1 * 100 = 10.
            See `_getPercentage()`.
        @param amount should be in decimals.
    */
    function computeFee(
        uint amount, 
        uint16 makerRate
    ) 
        internal 
        pure 
        returns (uint mFee) 
    {
        mFee = _getPercentage(amount, makerRate);
    }

    /**     @dev Calculation of percentage.
        *   This is how we calculate percentage to arrive at expected value with 
        *   good precision.
        *   We chose a base value (numerator as 10000) repesenting a 100% of input value. This means if Alice wish to set 
        *   her interest rate to 0.05%, she only need to multiply it by 100 i.e 0.05 * 100 = 5. Her input will be 5. 
        *   Since Solidity do not accept decimals as input, in our context, the minimum value to parse is '0' indicating 
        *   zero interest rate. If the platform wish to set interest at least, the minimum value will be 1 reprensenting 0.01%.
        *   The minimum interest rate to set is 0.01% if interest must be set at least.
        *   @notice To reiterate, raw interest must be multiplied by 100 before giving as input. 
        *   @param principal : The principal value on which the interest is based. Value should be in decimals.
        *   @param interest : Interest rate. 
        *   
        *   Rules
        *   -----
        *   - Principal cannot be less than base.
        *   - Interest cannot be greater than (2 ^ 16) - 1
    */
    function _getPercentage(
        uint principal, 
        uint16 interest
    )
        internal 
        pure 
        returns (uint _return) 
    {
        uint16 base = _getBase(); 
        if(interest == 0 || principal == 0) return 0;
        assertLThan(interest, type(uint16).max, "Interest overflow");
        assertGThan(principal, base, "Principal should be greater than 10000");
        unchecked {
            _return = (principal * interest) / base;
        }
    }
}