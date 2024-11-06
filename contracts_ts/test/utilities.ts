import { Address, Addresses, NullNoPromise, StrBigHex } from "./types";
import { Web3 } from "hardhat"
import BigNumber from "bignumber.js";
import { Hex } from "viem";
import { expect } from "chai";

export const bigintToStr = (x:bigint) => x.toString();
export const toHex = (x: any) => Web3.utils.numberToHex(x);
export const buildstring = (affx: string, start: string, times: number) => `${affx}${`${start}`.repeat(times)}`;
export const formatAddr = (x: string | (Address | undefined)) : Address => {
  if(!x || x === "") return `0x${'0'.repeat(40)}`;
  return `0x${x.substring(2, 42)}`;
};

export const convertStringsToAddresses = (args: string[]) => {
  let returnArr : Addresses = []; 
  for(let i = 0; i < args.length; i++) {
    returnArr.push(formatAddr(args[i]));
  }
  return returnArr;
}
export const DECIMALS = 18;
export const SYMBOL = "TUSDT";
export const NAME = "TestUSDT";
export const ZERO = 0n;

/**
 * Wraps `arg` into a big number
 * @param arg : Parameter of type, to be wrapped into Bignumber
 * @returns : BigNumber instance
 */
export const bn = (arg: StrBigHex): BigNumber => {
  const big = new BigNumber(arg); 
  return big;
};

/**
 * Test that arg0 is true
 * @param arg0 : Parameter that evaluate to true
 * @param errorMessage : Result message if arg0 is false
 */
export function assertTrue(arg0: boolean, errorMessage?: string) {
  if (!arg0) throw new Error(errorMessage);
}

/**
 * Test that arg0 is false
 * @param arg0 : Parameter that evaluates to false
 * @param errorMessage : Result message if arg0 is false
 */
export function assertFalse(arg0: boolean, errorMessage?: string) {
  if (arg0) throw new Error(errorMessage);
}

/**
 * Accept input of type BigNumber, formats to a number.
 * @param arg : StrBigHex
 * @returns : Number
 */
export const formatToNumber = (arg: StrBigHex): number => {
  return bn(arg).toNumber();
};

/**
 * Accept input of type BigNumber, formats to a string.
 * @param arg : StrBigHex
 * @returns : string
 */
export const formatToString = (arg: StrBigHex): string => {
  return bn(arg).toString();
};

/**
 * @dev Converts 'x' to string
 * @param x : Parameter of type Hex
 * @returns string
 */
export const convertFromHex = (x: Hex) => Web3.utils.hexToNumberString(x);

// /**
//  * @dev Converts 'x' to BN
//  * @param x : string | number
//  * @returns Big number of type web3.utils.toBN
//  */
// export const wrap = (x: string | number) => Web3.utils.toBN(x);

/**
 * @dev Return the sum of 'a' and 'b'
 * @param a : Param of type StrBigHex
 * @param b : Param of type StrBigHex
 * @returns string
 */
export const sumToNumber = (a: StrBigHex, b: StrBigHex) : number => formatToNumber(bn(a).plus(bn(b)).toString());

/**
 * @dev Return the sum of 'a' and 'b'
 * @param a : Param of type StrBigHex
 * @param b : Param of type StrBigHex
 * @returns string
 */
export const sumToString = (a: StrBigHex, b: StrBigHex) : string => bn(a).plus(bn(b)).toString();

/**
 * @dev Return the mul of 'a' and 'b'
 * @param a : Param of type StrBigHex
 * @param b : Param of type StrBigHex
 * @returns string
 */
export const mulToString = (a: StrBigHex, b: StrBigHex) : string => {
  if(bn(a).isZero() || bn(b).isZero()) return bn(0).toString();
  return bn(a).times(bn(b)).toString();
}

/**
 * @dev Return the result of subtracting 'b' from 'a'
 * @param a : Param of type StrBigHex
 * @param b : Param of type StrBigHex
 * @returns BigNumber
 */
export const reduce = (a: StrBigHex, b: StrBigHex): BigNumber => {
  assertTrue(bn(a).gte(bn(b)), `${a} is less than ${b}`);
  return bn(a).minus(bn(b));
};

/**
 * @dev Check if 'a' and 'b' are equal.
 * @param a : Param of type string | BigNumber | Hex
 * @param b : Param of type string | BigNumber | Hex
 * @returns void
 */
export const compareEqualNumber = (a: StrBigHex, b: StrBigHex): NullNoPromise => {
  expect(formatToNumber(a)).to.equal(formatToNumber(b));
};

/**
 * @dev Check if 'a' and 'b' are equal.
 * @param a : Param of type string
 * @param b : Param of type string
 * @returns void
 */
export const compareEqualString = (a: string, b: string): NullNoPromise => {
  expect(a).to.equal(b);
};

