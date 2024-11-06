// import { writeContract, simulateContract } from "wagmi/actions";
// import { ListItemParams } from "@/interfaces";
// import { getSellerV1Address } from "@/apis/contractAddresses";
// import { waitForConfirmation } from "@/apis/waitForConfirmation";
// import { formatError } from "@/apis/formatError";

// export async function listItem(args: ListItemParams) {
//     const { config, callback, account, categorySelector, description, imageUrI, location, priceLimit, quantity } = args;
//     if(config) {
//       callback?.({message: "Hold on while we create your AD", txDone: true});
//       try {
//         const { request } = await simulateContract(config, {
//           address: getSellerV1Address(),
//           account,
//           abi: listItemAbi,
//           functionName: "listItem",
//           args: [quantity, categorySelector, priceLimit, imageUrI, description, location]
//         });
//         const hash = await writeContract(config, request );
//         await waitForConfirmation({config, hash, fetch: true, setTrxnDone: true, callback: callback!});
//       } catch (error: any) {
//         callback?.({message: formatError(error), txDone: true});
//       }
//     }import { editPriceAbi } from "@/apiComponents/abis/seller/editPriceAbi";
import { getSellerV1Address } from "@/apiComponents/contractAddresses";
import { listItemAbi } from "@/apiComponents/abis/seller/listItemAbi";
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusLabel,
  TransactionStatusAction
} from '@coinbase/onchainkit/transaction';
import type { TransactionError, TransactionResponse } from '@coinbase/onchainkit/transaction';
import { baseSepolia } from 'viem/chains';

export default function ListItem({quantity, location, categorySelector, priceLimit, imageUrI, description, handleError, handleSuccess} : ListItemParam) {
  const contracts = [
    {
      address: getSellerV1Address(),
      abi: listItemAbi,
      functionName : 'listItem',
      args: [quantity, categorySelector, priceLimit, imageUrI, description, location]
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
              <TransactionButton text="ListItem" className='mt-0 mr-auto ml-auto max-w-full text-white bg-kimred/80 rounded-full hover:bg-kimred/90 hover:shadow-md hover:shadow-kimdeepnavy active:shadow-lg focus:ring-1' />
              <TransactionStatus>
                  <TransactionStatusLabel />
                  <TransactionStatusAction />
              </TransactionStatus>
          </Transaction>
      </div>
  );
}

interface ListItemParam {
  quantity: number;
  categorySelector: number;
  priceLimit: bigint;
  imageUrI: string;
  description: string;
  location: string;
  handleError: (err: TransactionError) => void;
  handleSuccess: (response: TransactionResponse) => void;
}
//   }

