import { BigNumber, BytesLike, ethers } from "ethers";
import { Address, Orders } from "./interfaces";

export const str = (x: string | undefined) : string => {
    return String(x);
} 

export const bn = (x: string | bigint) => BigNumber.from(x);
export const toBigInt = (x: string | number) => BigNumber.from(x).toBigInt();
// export const powr = (x: number | string, power: number, decimals: number): BigNumber => {
//     return BigNumber.from(x).mul(BigNumber.from(BigNumber.from(10).pow(decimals))).mul(BigNumber.from(power));
// }

// Solidity standard way of encoding strings to bytes
export const encode = (arg: string) => ethers.utils.defaultAbiCoder.encode(["string"], [arg]);

// Solidity standard way of decoding bytes to strings
export const decode = (arg: BytesLike) : string => ethers.utils.defaultAbiCoder.decode(["string"], arg)?.[0];

// /**
//  * Extract title from a concatenated string.
//  * The first 30 characters will always be the title for any item. We concatenate the title
//  * with the desciption before encoding and send to the blockchain
//  * @param arg 
//  * @returns string
//  */
// export const formatDescription = (arg: string) => {
//     if(arg.length == 0) return { title: 'No title', descriptn: 'No description'};
//     return {
//         title: arg.substring(0, 31),
//         descriptn: arg.substring(31, arg.length-1)
//     };
// }

export const formatOrderForCurrentUser = (orders: Orders, user: Address) => {
    let hasOrder = false;
    let orderId = 0;
    const ownOrder = orders?.filter((order, i) => {
        const hasOrd = order.customer.toLowerCase() === user.toLowerCase();
        if(hasOrd) orderId = i;
        return hasOrd;
    });
    if(ownOrder.length > 0) hasOrder = true;
    return { hasOrder, ownOrder, stage: ownOrder?.[0]?.stage, orderId }
}

export const convertOnchainTimeToDate = (arg: number) => {
    var newDate = new Date(arg);
    return `${newDate.toLocaleDateString("en-GB")} ${newDate.toLocaleTimeString("en-US")}`;
}