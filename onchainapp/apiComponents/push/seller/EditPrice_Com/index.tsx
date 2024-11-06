// import { writeContract, simulateContract } from "wagmi/actions";
// import { Address, Config, TransactionCallback } from "@/interfaces";
// import { getSellerV1Address } from "@/apis/contractAddresses";
// import { waitForConfirmation } from "@/apis/waitForConfirmation";
// import { formatError } from "@/apis/formatError";
// import { editPriceAbi } from "@/apis/abis/seller/editPriceAbi";

// export async function editPrice(args: EditPriceParam) {
//     const { config, callback, account, itemId, newPrice } = args;
//     if(config) {
//       callback?.({message: `Setting new price for Item with itemID : ${itemId.toString()}`, txDone: true});
//       try {
//         const { request } = await simulateContract(config, {
//           address: getSellerV1Address(),
//           account,
//           abi: editPriceAbi,
//           functionName: "editPriceLimit",
//           args: [itemId, newPrice]
//         });
//         const hash = await writeContract(config, request );
//         await waitForConfirmation({config, hash, fetch: true, setTrxnDone: true, callback: callback!});
//       } catch (error: any) {
//         callback?.({message: formatError(error), txDone: true});
//       }
//     }
//   }

  // interface EditPriceParam extends Config {
  //   itemId: bigint;
  //   newPrice: bigint;
  // }


// import { cancelOrderAbi } from "@/apiComponents/abis/seller/cancelOrderAbi";
// import { startOrderAbi } from "@/apiComponents/abis/buyer/startOrderAbi";
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

export default function EditPrice_Com({itemId, newPrice, handleError, handleSuccess} : EditPriceParam) {
  const contracts = [
    {
      address: getSellerV1Address(),
      abi: editPriceAbi,
      functionName : 'editPriceLimit',
      args: [itemId, newPrice]
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
              <TransactionButton text="EditPrice" className='mt-0 mr-auto ml-auto max-w-full text-white bg-kimred/80 rounded-full hover:bg-kimred/90 hover:shadow-md hover:shadow-kimdeepnavy active:shadow-lg focus:ring-1' />
              <TransactionStatus>
                  <TransactionStatusLabel />
                  <TransactionStatusAction />
              </TransactionStatus>
          </Transaction>
      </div>
  );
}

interface EditPriceParam {
  itemId: bigint;
  newPrice: bigint;
  handleError: (err: TransactionError) => void;
  handleSuccess: (response: TransactionResponse) => void;
}