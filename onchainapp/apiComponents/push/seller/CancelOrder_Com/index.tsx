// import { writeContract, simulateContract } from "wagmi/actions";
// import { Address, Config, TransactionCallback } from "@/interfaces";
// import { getSellerV1Address } from "@/apis/contractAddresses";
// import { waitForConfirmation } from "@/apis/waitForConfirmation";
// import { formatError } from "@/apis/formatError";
// import { cancelOrderAbi } from "@/apis/abis/seller/cancelOrderAbi";

// export async function cancelOrder(args: CancelOrderParam) {
//     const { config, callback, account, itemId, stageSelector, orderId } = args;
//     if(config) {
//       callback?.({message: `You're canceling order with orderId: ${orderId.toString()}`, txDone: true});
//       try {
//         const { request } = await simulateContract(config, {
//           address: getSellerV1Address(),
//           account,
//           abi: cancelOrderAbi,
//           functionName: "acceptOrder",
//           args: [stageSelector, itemId, orderId]
//         });
//         const hash = await writeContract(config, request );
//         await waitForConfirmation({config, hash, fetch: true, setTrxnDone: true, callback: callback!});
//       } catch (error: any) {
//         callback?.({message: formatError(error), txDone: true});
//       }
//     }
//   }

  // interface CancelOrderParam extends Config {
  //   itemId: bigint;
  //   stageSelector: number;
  //   orderId: bigint;
  // }

import { cancelOrderAbi } from "@/apiComponents/abis/seller/cancelOrderAbi";
// import { startOrderAbi } from "@/apiComponents/abis/buyer/startOrderAbi";
import { getSellerV1Address } from "@/apiComponents/contractAddresses";
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusLabel,
  TransactionStatusAction
} from '@coinbase/onchainkit/transaction';
import type { TransactionError, TransactionResponse } from '@coinbase/onchainkit/transaction';
import { baseSepolia } from 'viem/chains';

export default function StartOrder_Com({itemId, stageSelector, orderId, handleError, handleSuccess} : CancelOrderParam) {
  const contracts = [
    {
      address: getSellerV1Address(),
      abi: cancelOrderAbi,
      functionName : 'acceptOrder',
      args: [stageSelector, itemId, orderId]
    }
  ]  
  return(
      <div className='flex '>
          <Transaction
              contracts={contracts}
              className=''
              onError={handleError}
              onSuccess={handleSuccess}
              chainId={baseSepolia.id}
          >
              <TransactionButton text="CancelOrder" className='mt-0 mr-auto ml-auto max-w-full text-white bg-kimred/80 rounded-full hover:bg-kimred/90 hover:shadow-md hover:shadow-kimdeepnavy active:shadow-lg focus:ring-1' />
              <TransactionStatus>
                  <TransactionStatusLabel />
                  <TransactionStatusAction />
              </TransactionStatus>
          </Transaction>
      </div>
  );
}

interface CancelOrderParam {
  itemId: bigint;
  stageSelector: number;
  orderId: bigint;
  handleError: (err: TransactionError) => void;
  handleSuccess: (response: TransactionResponse) => void;
}