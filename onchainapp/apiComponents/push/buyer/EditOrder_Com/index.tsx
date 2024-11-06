// import { writeContract, simulateContract } from "wagmi/actions";
// import type { Config, } from "@/interfaces";
// import { getSellerV1Address } from "@/apis/contractAddresses";
// import { waitForConfirmation } from "@/apis/waitForConfirmation";
// import { formatError } from "@/apis/formatError";

// export async function editOrder(args: EditOrderParam) {
//   const { config, callback, account, itemId, orderId, newQuantity, newOfferPrice } = args;
//   if(config) {
//     callback?.({message: `Changing order details at orderId: ${orderId}`, txDone: true});
//     try {
//       const { request } = await simulateContract(config, {
//         address: getSellerV1Address(),
//         account,
//         abi: editOrderAbi,
//         functionName: "editOrder",
//         args: [newQuantity, itemId, newOfferPrice, orderId]
//       });
//       const hash = await writeContract(config, request );
//       await waitForConfirmation({config, hash, fetch: true, setTrxnDone: true, callback: callback!});
//     } catch (error: any) {
//       callback?.({message: formatError(error), txDone: true});
//     }
//   }
// }

// interface EditOrderParam extends Config {
//   itemId: bigint;
//   orderId: bigint;
//   newQuantity: number;
//   newOfferPrice: bigint;
// }
// import { confirmOnReceiptAbi } from "@/apiComponents/abis/buyer/confirmOnReceiptAbi";
// import type { Address, ContractFunctionParameters} from 'viem';


import { getBuyerV1Address } from "@/apiComponents/contractAddresses";
import { editOrderAbi } from "@/apiComponents/abis/buyer/editOrderAbi";
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusLabel,
  TransactionStatusAction
} from '@coinbase/onchainkit/transaction';
import type { TransactionError, TransactionResponse } from '@coinbase/onchainkit/transaction';
import { baseSepolia } from 'viem/chains';

export default function EditOrder_Com({itemId, orderId, newQuantity, newOfferPrice, handleError, handleSuccess} : StartOrderParam) {
  const contracts = [
    {
      address: getBuyerV1Address(),
      abi: editOrderAbi,
      functionName : 'editOrder',
      args: [newQuantity, itemId, newOfferPrice, orderId]
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
              <TransactionButton text="EditOrder" className='mt-0 mr-auto ml-auto max-w-full text-white bg-kimred/80 rounded-full hover:bg-kimred/90 hover:shadow-md hover:shadow-kimdeepnavy active:shadow-lg focus:ring-1'/>
              <TransactionStatus>
                  <TransactionStatusLabel />
                  <TransactionStatusAction />
              </TransactionStatus>
          </Transaction>
      </div>
  );
}

interface StartOrderParam {
  itemId: bigint;
  orderId: bigint;
  newQuantity: number;
  newOfferPrice: bigint;
  handleError: (err: TransactionError) => void;
  handleSuccess: (response: TransactionResponse) => void;
}