// import { writeContract, simulateContract } from "wagmi/actions";
// import { getTestUSDTAddress } from "../../contractAddresses";
// import { formatError } from "@/apis/formatError";
// import { withdrawAbi } from "@/apis/abis/asset/withdrawAbi";
// import { waitForConfirmation } from "@/apis/waitForConfirmation";

// export async function setApproval(args: WithdrawParam ) {
//   const { config, callback, from, amount, to, account } = args;
//   if(config) {
  //     callback?.({message: "Withdrawing payment", txDone: true});
  //     try {
    //       const { request } = await simulateContract(config, {
      //         address: getTestUSDTAddress(),
      //         account,
      //         abi: withdrawAbi,
      //         functionName: "transferFrom",
      //         args: [from, to, amount]
      //       });
//       const hash = await writeContract(config, request );
//       await waitForConfirmation({config, hash, fetch: true, setTrxnDone: true, callback: callback!});
//     } catch (error: any) {
  //       callback?.({message: formatError(error), txDone: true});
  //     }
//   }
// }

import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusLabel,
  TransactionStatusAction
} from '@coinbase/onchainkit/transaction';
import type { TransactionError, TransactionResponse } from '@coinbase/onchainkit/transaction';
import { baseSepolia } from 'viem/chains';
import { Address } from "@/interfaces";
import { withdrawAbi } from "@/apiComponents/abis/asset/withdrawAbi";
import { getTestUSDTAddress } from "@/apiComponents/contractAddresses";

export default function Withdraw({from, to, amount, handleError, handleSuccess} : WithdrawParam) {
  const contracts = [
    {
      address: getTestUSDTAddress(),
      abi: withdrawAbi,
      functionName : 'transferFrom',
      args: [from, to, amount]
    }
  ]  
  return(
      <div className='flex w-[450px]'>
          <Transaction
              contracts={contracts}
              className='w-[450px]'
              onError={handleError}
              onSuccess={handleSuccess}
              chainId={baseSepolia.id}
          >
              <TransactionButton className='mt-0 mr-auto ml-auto w-[450px] max-w-full text-white' />
              <TransactionStatus>
                  <TransactionStatusLabel />
                  <TransactionStatusAction />
              </TransactionStatus>
          </Transaction>
      </div>
  );
}

interface WithdrawParam {
  amount: bigint, 
  from: Address,
  to: Address
  handleError: (err: TransactionError) => void;
  handleSuccess: (response: TransactionResponse) => void;
}
