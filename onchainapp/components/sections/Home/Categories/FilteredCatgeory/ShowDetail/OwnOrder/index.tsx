import { Orders } from "@/interfaces";
import React from "react";
import { Chevron } from "../Actions/Chevron";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import { formatEther, zeroAddress } from "viem";
import { CLASSNAME, STAGESELECTOR_TO_STRING } from "@/constants";
import { convertOnchainTimeToDate, decode } from "@/utilities";
import Box from "@mui/material/Box";

export const OwnOrder: React.FC<{ownOrder: Orders}> = ({ ownOrder }) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const { commitment, date, firstSigner, info: {contacts, destination}, offerPrice, quantity, stage } = ownOrder[0];
    return(
        <React.Fragment>
            <button onClick={() => setOpen(!open)} className="flex justify-between items-center font-medium w-full p-2 shadow-md shadow-yellow-200 rounded-lg text-yellow-800">
                <h3>My Order</h3>
                <Chevron {...{open}} />
            </button>
            <Collapse in={open} timeout="auto" unmountOnExit className={'w-full'}>
                <Box className=" text-stone-500 text-xs p-2">
                    <div className={CLASSNAME.concat("text-sm font-semibold")}>
                        <h3 className="w-[35%] text-justify p-1">Quantity</h3>
                        <h3 className="border border-white p-2 w-[65%] text-end">{quantity}</h3>
                    </div>
                    <Divider />
                    <div className={CLASSNAME.concat("text-sm font-semibold")}>
                        <h3 className="w-[35%] text-justify p-1">Price</h3>
                        <h3 className="border border-white p-2 w-[65%] text-end">{`USDT${formatEther(offerPrice)}`}</h3>
                    </div>
                    <Divider />
                    <div className={CLASSNAME.concat("text-sm font-semibold")}>
                        <h3 className="w-[35%] text-justify p-1">Commitment</h3>
                        <h3 className="border border-white p-2 w-[65%] text-end">{`USDT${formatEther(commitment)}`}</h3>
                    </div>
                    <Divider />
                    <div className={CLASSNAME.concat("text-sm font-semibold")}>
                        <h3 className="w-[35%] text-justify p-1">Stage</h3>
                        <h3 className="border border-white p-2 w-[65%] text-end">{`${STAGESELECTOR_TO_STRING[stage]}`}</h3>
                    </div>
                    <Divider />
                    <div className={CLASSNAME.concat("text-sm font-semibold")}>
                        <h3 className="w-[35%] text-justify p-1">Date Ordered</h3>
                        <h3 className="border border-white p-2 w-[65%] text-end">{`${convertOnchainTimeToDate(date)}`}</h3>
                    </div>
                    <Divider />
                    <div className={CLASSNAME.concat("text-sm font-semibold")}>
                        <h3 className="w-[35%] text-justify p-1">Seller Delivered</h3>
                        <h3 className="border border-white p-2 w-[65%] text-end">{firstSigner === zeroAddress? 'Not Delivered' : 'Delivered'}</h3>
                    </div>
                    <Divider />
                    <div className={CLASSNAME.concat("text-sm font-semibold")}>
                        <h3 className="w-[35%] text-justify p-1">Contact</h3>
                        <h3 className="border border-white p-2 w-[65%] text-end">{decode(contacts)}</h3>
                    </div>
                    <Divider />
                    <div className={CLASSNAME.concat("text-sm font-semibold")}>
                        <h3 className="w-[35%] text-justify p-1">Destination</h3>
                        <h3 className="border border-white p-2 w-[65%] text-end">{decode(destination)}</h3>
                    </div>
                    <Divider />
                </Box>
            </Collapse>
        </React.Fragment>
    );
}