import Stack from "@mui/material/Stack";
import React from "react";
import Divider from "@mui/material/Divider";
import { decode, formatOrderForCurrentUser } from "@/utilities";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { Actions } from "./Actions";
import { formatAddr } from "@/apiComponents/contractAddresses";
import { OwnOrder } from "./OwnOrder";
import useContext from "@/components/StateContextProvider/useContext";
import { resolveScheme } from "thirdweb/storage";
import { client } from "@/client";

export const ShowDetail = () => {
    const { toggleShowdetail, selectedItem, togglePlaceOrderRequest } = useContext();
    const { address } = useAccount();

    const { 
        info: { description, priceLimit, location, orders },
        meta: { uri}, 
        seller
    } = selectedItem;
    const { ownOrder } = formatOrderForCurrentUser(orders, formatAddr(address));
    const isSeller = formatAddr(address).toLowerCase() === seller.toLowerCase();
    const descriptn = decode(description);
    const title = descriptn.substring(0, 15);
    return(
        <Stack className='pb-[100px] space-y-4 place-items-center'>
            <div className={'w-full px-4'}>
                <button onClick={toggleShowdetail} className="mb-4 rounded-lg p-2 text-xs text-kimnavy shadow-md hover:text-kimred active:shadow-kimred">Back</button>
            </div>
            <Divider />
            <img
                src={resolveScheme({client, uri: decode(uri)})}
                alt={descriptn.substring(0, 10)}
                className="object-cover w-full "
            />
            <Stack className='p-4 space-y-4'> 
                <div className='flex justify-between items-center'>
                    <h3 className='text-stone-500 font-black '>{`$${formatEther(priceLimit)}`}</h3>
                    <h3 className='text-yellow-500 font-bold text-lg'>{`${title} ...`}</h3>
                </div>
                <Divider />
                <div className='text-stone-500 text-xs font-bold flex justify-between items-center'>
                    <h3 className='p-2 w-[100px]'>Location</h3> 
                    <h3 className='border-l-2 p-3'>{decode(location)}</h3>
                </div>
                <Divider />
                <div className='text-stone-500 text-xs font-bold flex justify-between items-center'>
                    <h3 className='p-2 w-[100px]'>Description</h3> 
                    <h3 className='border-l-2 p-3'>{descriptn}</h3>
                </div>

                { 
                    ownOrder.length > 0 ? 
                        <OwnOrder { ...{ ownOrder } } /> : !isSeller? <button className="bg-yellow-50 text-yellow-800 rounded-lg p-2 shadow-md shadow-yellow-100 text-sm font-semibold" onClick={togglePlaceOrderRequest}>Place Order</button> : null
                }
                <Actions {...{title}} />
            </Stack>
        </Stack>
    );
}