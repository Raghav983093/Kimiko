import { Address } from "@/interfaces";
import factory from "@/deployments/testnet/Factory.json";
import seller from "@/deployments/testnet/SellerV1.json";
import buyer from "@/deployments/testnet/BuyerV1.json";
import tUSDT from "@/deployments/testnet/TestUSDT.json";
import { zeroAddress } from "viem";

export const formatAddr = (arg: string | (Address | undefined)) : Address => {
    if(!arg || arg === "" || arg === undefined) return zeroAddress;
    return `0x${arg.substring(2, 42)}`;
};

export const getFactoryAddress = () => {
    return formatAddr(factory.address);
}

export const getSellerV1Address = () => {
    return formatAddr(seller.address);
}

export const getBuyerV1Address = () => {
    return formatAddr(buyer.address);
}

export const getTestUSDTAddress = () => {
    return formatAddr(tUSDT.address);
}
