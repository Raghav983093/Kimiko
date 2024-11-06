// import { writeContract, simulateContract } from "wagmi/actions";
// import type { Config, } from "@/interfaces";
import { getBuyerV1Address} from "@/apiComponents/contractAddresses";
// import { waitForConfirmation } from "@/apis/waitForConfirmation";
// import { formatError } from "@/apis/formatError";
import { cancelOrderAbi } from "@/apiComponents/abis/buyer/cancelOrderAbi";

// export async function cancelOrder(args: CancelOrderParam) {
//     const { config, callback, account, itemId, orderId } = args;
//     if(config) {
//       callback?.({message: "Canceling your order", txDone: true});
//       try {
//         const { request } = await simulateContract(config, {
//           address: getSellerV1Address(),
//           account,
//           abi: cancelOrderAbi,
//           functionName: "cancelOrder",
//           args: [itemId, orderId]
//         });
//         const hash = await writeContract(config, request );
//         await waitForConfirmation({config, hash, fetch: true, setTrxnDone: true, callback: callback!});
//       } catch (error: any) {
//         callback?.({message: formatError(error), txDone: true});
//       }
//     }
//   }

//   interface CancelOrderParam extends Config {
//     itemId: bigint;
//     orderId: bigint;
//   }

import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusLabel,
  TransactionStatusAction
} from '@coinbase/onchainkit/transaction';
import type { TransactionError, TransactionResponse } from '@coinbase/onchainkit/transaction';
// import type { Address, ContractFunctionParameters} from 'viem';
import { baseSepolia } from 'viem/chains';

export default function CancelOrder_Com({itemId, orderId, handleError, handleSuccess} : CancelOrderParam) {
  const contracts = [
    {
      address: getBuyerV1Address(),
      abi: cancelOrderAbi,
      functionName : 'cancelOrder',
      args: [itemId, orderId]
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
  orderId: bigint;
  handleError: (err: TransactionError) => void;
  handleSuccess: (response: TransactionResponse) => void;
}

// const handleError = (err: TransactionError) => {

// }

// const handleSuccess = (response: TransactionResponse) => {

// }