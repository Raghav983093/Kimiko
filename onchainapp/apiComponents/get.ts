import type { WagmiConfig, Data, Address } from "@/interfaces";
import { readContract as read } from "wagmi/actions";
import { getBuyerV1Address, getFactoryAddress, getTestUSDTAddress } from "./contractAddresses";
import { getDataAbi } from "./abis/factory/getDataAbi";
import { getBalanceAbi } from "./abis/asset/getBalance";
import { allowanceAbi } from "./abis/asset/allowanceAbi";

const address = getFactoryAddress();

export async function getData({config} : {config: WagmiConfig}) : Promise<Data> {
  return await read(config, {
    abi: getDataAbi,
    address, 
    functionName: "getData",
    args: []
  });
}

export async function getBalance({config, account} : {config: WagmiConfig, account: Address}) : Promise<bigint> {
  return config? await read(config, {
    abi: getBalanceAbi,
    address: getTestUSDTAddress(), 
    functionName: "balanceOf",
    args: [account]
  }) : 0n;
}

export async function getAllowance({config, account} : {config: WagmiConfig, account: Address}) : Promise<bigint> {
  return config? await read(config, {
    abi: allowanceAbi,
    address: getTestUSDTAddress(), 
    functionName: "allowance",
    args: [account, getBuyerV1Address()]
  }) : 0n;
}
