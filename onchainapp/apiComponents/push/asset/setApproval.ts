// import { writeContract, simulateContract } from "wagmi/actions";
// import { Config } from "wagmi";
// import { approvalAbi } from "@/apis/abis/asset/approvalAbi";
// import { Address, TransactionCallback } from "@/interfaces";
// import { getTestUSDTAddress } from "@/apis/contractAddresses";
// import { waitForConfirmation } from "@/apis/waitForConfirmation";
// import { formatError } from "@/apis/formatError";

// export async function setApproval(args: {config: Config, amount: bigint, spender: Address, callback?: TransactionCallback, account: Address}) {
//     const { config, callback, amount, account, spender } = args;
//     if(config) {
//       callback?.({message: "Giving spending approval", txDone: true});
//       try {
//         const { request } = await simulateContract(config, {
//           address: getTestUSDTAddress(),
//           account,
//           abi: approvalAbi,
//           functionName: "approve",
//           args: [spender, amount]
//         });
//         const hash = await writeContract(config, request );
//         await waitForConfirmation({config, hash, fetch: true, setTrxnDone: true, callback: callback!});
//       } catch (error: any) {
//         callback?.({message: formatError(error), txDone: true});
//       }
//     }
//   }