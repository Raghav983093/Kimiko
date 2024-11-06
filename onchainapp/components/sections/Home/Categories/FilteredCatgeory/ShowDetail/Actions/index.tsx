import React from "react";
import { useAccount } from "wagmi";
import { formatOrderForCurrentUser } from "@/utilities";
import { formatAddr } from "@/apiComponents/contractAddresses";
import { STAGESELECTOR } from "@/constants";
import { PlaceOrder } from "./PlaceOrder";
import { EditOrder } from "./EditOrder";
import useContext from "@/components/StateContextProvider/useContext";
import ConfirmOnReceipt_Com from "@/apiComponents/push/buyer/ConfirmOnReceipt_Com";
import CancelOrder_Com from "@/apiComponents/push/buyer/CancelOrder_Com";

export const Actions: React.FC<{title: string}> = ({title}) => {
    const { selectedItem, handleError, handleSuccess, toggleEditOrderRequest, togglePlaceOrderRequest } = useContext();
    
    const { info: { orders, id }} = selectedItem;
    const { address } = useAccount();
    // const callback : TransactionCallback = (arg) => {
    //     if(arg.message) setmessage(arg.message);
    //     if(arg.result) setstate(arg.result);
    // }
    const { hasOrder, stage, orderId } = formatOrderForCurrentUser(orders, formatAddr(address));
    const canPlaceOrder = orders.length === 0 || (orders.length > 0 && !hasOrder);
    const canCancelOrder = hasOrder && (stage === STAGESELECTOR.ACCEPTED || stage === STAGESELECTOR.COMMIT || stage === STAGESELECTOR.REJECTED);
    const canEditOrder = hasOrder && (stage === STAGESELECTOR.COMMIT || stage === STAGESELECTOR.REJECTED);
    const canConfirmReceipt = hasOrder && ( stage === STAGESELECTOR.DELIVERED);

    const actionContent = [
        {
            text: 'Place Order',
            condition: canPlaceOrder,
            func: () =>  {
                togglePlaceOrderRequest();
                return(<></>)
            }
        },
        {
            text: 'Cancel Order',
            condition: canCancelOrder,
            func: () => <CancelOrder_Com 
                itemId={id}
                orderId={BigInt(orderId)}
                handleError={handleError}
                handleSuccess={handleSuccess}
            />
        },
        {
            text: 'Confirm Receipt',
            condition: canConfirmReceipt,
            func: () => <ConfirmOnReceipt_Com 
                itemId={id}
                orderId={BigInt(orderId)}
                handleError={handleError}
                handleSuccess={handleSuccess}
            />
        },
        {
            text: 'Edit Order',
            condition: canEditOrder,
            func: () => {
                toggleEditOrderRequest()
                return(<></>)
            }
        },
    ]

    return(
        <React.Fragment>
            <div className="flex flex-col justify-center gap-2">
                {
                    actionContent.map(({condition, func, text}) => (
                        <div hidden={!condition} key={text} >
                            {
                                text === "Cancel Order" || text === "Confirm Receipt"? func() : <button key={text} disabled={!condition} hidden={!condition} onClick={func} className="bg-kimred/90 p-3 w-full rounded-full text-sm text-kimwhite hover:shadow-md hover:shadow-kimdeepnavy active:shadow-lg focus:shadow-inner">
                                { text }
                            </button>
                            }
                        </div>
                        
                    ))
                }
            </div>
            <PlaceOrder {...{title, itemId: id}} />
            <EditOrder {...{title, itemId: id, orderId: BigInt(orderId)}} />
        </React.Fragment>
    );
}
