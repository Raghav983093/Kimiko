// import { writi } from "@/apis/abis/seller/editQuantityAbi";
// eContract, simulateContract } from "wagmi/actions";
// import { Address, Config, TransactionCallback } from "@/interfaces";
// import { getSellerV1Address } from "@/apis/contractAddresses";
// import { waitForConfirmation } from "@/apis/waitForConfirmation";
// import { formatError } from "@/apis/formatError";
// import { editQuantityAb
// export async function editQuantity(args: EditPriceParam) {
//     const { config, callback, account, itemId, newQuantity } = args;
//     if(config) {
//       callback?.({message: `Setting new quantity for Item with itemID : ${itemId.toString()}`, txDone: true});
//       try {
//         const { request } = await simulateContract(config, {
//           address: getSellerV1Address(),
//           account,
//           abi: editQuantityAbi,
//           functionName: "editQuantity",
//           args: [newQuantity, itemId]
//         });
//         const hash = await writeContract(config, request );
//         await waitForConfirmation({config, hash, fetch: true, setTrxnDone: true, callback: callback!});
//       } catch (error: any) {
//         callback?.({message: formatError(error), txDone: true});
//       }
//     }
//   }

import { editPriceAbi } from "@/apiComponents/abis/seller/editPriceAbi";
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

export default function EditQuantity_Com({itemId, newQuantity, handleError, handleSuccess} : EditQuantityParam) {
  const contracts = [
    {
      address: getSellerV1Address(),
      abi: editPriceAbi,
      functionName : 'editQuantity',
      args: [newQuantity, itemId]
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
              <TransactionButton text="EditQuantity" className='mt-0 mr-auto ml-auto max-w-full text-white bg-kimred/80 rounded-full hover:bg-kimred/90 hover:shadow-md hover:shadow-kimdeepnavy active:shadow-lg focus:ring-1' />
              <TransactionStatus>
                  <TransactionStatusLabel />
                  <TransactionStatusAction />
              </TransactionStatus>
          </Transaction>
      </div>
  );
}

interface EditQuantityParam {
  itemId: bigint;
  newQuantity: number;
  handleError: (err: TransactionError) => void;
  handleSuccess: (response: TransactionResponse) => void;
}