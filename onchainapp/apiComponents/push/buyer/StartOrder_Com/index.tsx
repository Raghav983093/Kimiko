// import { writeContract, simulateContract } from "wagmi/actions";
// import type { Config, } from "@/interfaces";
// import { getSellerV1Address } from "@/apis/contractAddresses";
// import { waitForConfirmation } from "@/apis/waitForConfirmation";
// import { formatError } from "@/apis/formatError";

// export async function startOrder(args: StartOrderParam) {
  //     const { config, callback, account, itemId, requestedQuantity, offerPrice, destinationAddr, contact } = args;
  //     if(config) {
    //       callback?.({message: "Placing your order", txDone: true});
    //       try {
      //         const { request } = await simulateContract(config, {
        //           address: getSellerV1Address(),
        //           account,
        //           abi: startOrderAbi,
        //           functionName: "startOrder",
        //           args: [requestedQuantity, itemId, offerPrice, destinationAddr, contact]
        //         });
        //         const hash = await writeContract(config, request );
        //         await waitForConfirmation({config, hash, fetch: true, setTrxnDone: true, callback: callback!});
        //       } catch (error: any) {
          //         callback?.({message: formatError(error), txDone: true});
          //       }
//     }
//   }
// import { editOrderAbi } from "@/apiComponents/abis/buyer/editOrderAbi";
import { approvalAbi } from "@/apiComponents/abis/asset/approvalAbi";
import { startOrderAbi } from "@/apiComponents/abis/buyer/startOrderAbi";
import { getBuyerV1Address, getTestUSDTAddress } from "@/apiComponents/contractAddresses";
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusLabel,
  TransactionStatusAction
} from '@coinbase/onchainkit/transaction';
import type { TransactionError, TransactionResponse } from '@coinbase/onchainkit/transaction';
import { baseSepolia } from 'viem/chains';

export default function StartOrder_Com({itemId, requestedQuantity, offerPrice, destinationAddr, contact, handleError, handleSuccess} : StartOrderParam) {
  const buyerContractAddr = getBuyerV1Address();
  const contracts = [
    {
      address: getTestUSDTAddress(),
      abi: approvalAbi,
      functionName : 'approve',
      args: [buyerContractAddr, BigInt(requestedQuantity) * offerPrice]
    },
    {
      address: buyerContractAddr,
      abi: startOrderAbi,
      functionName : 'startOrder',
      args: [requestedQuantity, itemId, offerPrice, destinationAddr, contact]
    }
  ]  
  return(
      <div className='flex'>
          <Transaction
              contracts={contracts}
              className=''
              onError={handleError}
              onSuccess={handleSuccess}
              chainId={baseSepolia.id}
          >
              <TransactionButton text="PlaceOrder" className='mt-0 mr-auto ml-auto max-w-full text-white bg-kimred/80 rounded-full hover:bg-kimred/90 hover:shadow-md hover:shadow-kimdeepnavy active:shadow-lg focus:ring-1' />
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
  requestedQuantity: number;
  offerPrice: bigint;
  destinationAddr: string;
  contact: string;
  handleError: (err: TransactionError) => void;
  handleSuccess: (response: TransactionResponse) => void;
}

  