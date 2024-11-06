// import { writeContract, simulateContract } from "wagmi/actions";
// import type { Config, } from "@/interfaces";
// import { getSellerV1Address } from "@/apis/contractAddresses";
// import { waitForConfirmation } from "@/apis/waitForConfirmation";
// import { formatError } from "@/apis/formatError";
// import { cancelOrderAbi } from "@/apis/abis/seller/cancelOrderAbi";

// export async function moveOrder(args: MoveOrderParam) {
//     const { config, callback, account, itemId, stageSelector, initDisplayMessage, orderId } = args;
//     if(config) {
//       callback?.({message: initDisplayMessage, txDone: true});
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

import { cancelOrderAbi } from "@/apiComponents/abis/seller/cancelOrderAbi";
import { getSellerV1Address } from "@/apiComponents/contractAddresses";
// import { listItemAbi } from "@/apiComponents/abis/seller/listItemAbi";
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusLabel,
  TransactionStatusAction
} from '@coinbase/onchainkit/transaction';
import type { TransactionError, TransactionResponse } from '@coinbase/onchainkit/transaction';
import { baseSepolia } from 'viem/chains';

export default function MoveOrder({orderId, itemId, stageSelector, handleError, handleSuccess} : MoveOrderParam) {
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
              <TransactionButton text="ChangeStatus" className='mt-0 mr-auto ml-auto max-w-full text-white bg-kimred/80 rounded-full hover:bg-kimred/90 hover:shadow-md hover:shadow-kimdeepnavy active:shadow-lg focus:ring-1' />
              <TransactionStatus>
                  <TransactionStatusLabel />
                  <TransactionStatusAction />
              </TransactionStatus>
          </Transaction>
      </div>
  );
}

interface MoveOrderParam {
  itemId: bigint;
  stageSelector: number;
  orderId: bigint;
  handleError: (err: TransactionError) => void;
  handleSuccess: (response: TransactionResponse) => void;
}
