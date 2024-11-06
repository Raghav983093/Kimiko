// import { writeContract, simulateContract } from "wagmi/actions";
// import type { Config, } from "@/interfaces";
// import { getSellerV1Address } from "@/apis/contractAddresses";
// import { waitForConfirmation } from "@/apis/waitForConfirmation";
// import { formatError } from "@/apis/formatError";
// import { removeItemAbi } from "@/apis/abis/seller/removeItemAbi";

// export async function removeItem(args: RemoveItemParam) {
//     const { config, callback, account, itemId } = args;
//     if(config) {
//       callback?.({message: `Removing item at id : ${itemId}`, txDone: true});
//       try {
//         const { request } = await simulateContract(config, {
//           address: getSellerV1Address(),
//           account,
//           abi: removeItemAbi,
//           functionName: "removeItem",
//           args: [itemId]
//         });
//         const hash = await writeContract(config, request );
//         await waitForConfirmation({config, hash, fetch: true, setTrxnDone: true, callback: callback!});
//       } catch (error: any) {
//         callback?.({message: formatError(error), txDone: true});
//       }
//     }
//   }

// import { cancelOrderAbi } from "@/apiComponents/abis/seller/cancelOrderAbi";
// import { listItemAbi } from "@/apiComponents/abis/seller/listItemAbi";
import { removeItemAbi } from "@/apiComponents/abis/seller/removeItemAbi";
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

export default function RemoveItem({itemId, handleError, handleSuccess} : RemoveItemParam) {
  const contracts = [
    {
      address: getSellerV1Address(),
      abi: removeItemAbi,
      functionName : 'removeItem',
      args: [itemId]
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
              <TransactionButton text="RemoveItem" className='mt-0 mr-auto ml-auto max-w-full text-white bg-kimred/80 rounded-full hover:bg-kimred/90 hover:shadow-md hover:shadow-kimdeepnavy active:shadow-lg focus:ring-1' />
              <TransactionStatus>
                  <TransactionStatusLabel />
                  <TransactionStatusAction />
              </TransactionStatus>
          </Transaction>
      </div>
  );
}

interface RemoveItemParam {
  itemId: bigint;
  handleError: (err: TransactionError) => void;
  handleSuccess: (response: TransactionResponse) => void;
}
