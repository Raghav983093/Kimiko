import React from "react";
import { PopUp } from "@/components/common/PopUp";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import EditOrder_Com from "@/apiComponents/push/buyer/EditOrder_Com";
import useContext from "@/components/StateContextProvider/useContext";

type Flag = 'setPrice' | 'setQuantity';

export const EditOrder: React.FC<{title: string, itemId: bigint, orderId: bigint}> = ({ title, itemId, orderId }) => {
    const [offerPrice, setPrice] = React.useState<string>('0');
    const [quantity, setQuantity] = React.useState<string>('0');
    const { handleError, handleSuccess, requestToEditOrder: modalOpen, toggleEditOrderRequest: handleModalClose} = useContext();
    const handleChangeEvent = (e:React.ChangeEvent<HTMLInputElement>, flag: Flag) => {
        e.preventDefault();
        const value = e.currentTarget.value === ''? '0' : e.currentTarget.value;
        switch (flag) {
            case 'setPrice':
                setPrice(value);
                break;
            case 'setQuantity':
                setQuantity(value);
                break;
            default:
                break;
        }
    }

    return(
        <PopUp { ...{modalOpen, handleModalClose}} >
            <Stack className="space-y-4 p-4 md:p-8 my-10 bg-stone-800 rounded-xl" >
                <div className="flex justify-between items-center text-yellow-50">
                    <h3 className="text font-black">{`Changing order for ${title}`}</h3>
                    <button className="bg-yellow-100 text-yellow-800 text-xs rounded-lg p-2 font-bold hover:shadow-md hover:shadow-yellow-200" onClick={handleModalClose}>Close</button>
                </div>
                <Divider sx={{bgcolor: 'white'}}/>
                <Stack className="w-full space-y-2 text-sm font-semibold">
                    <h3>{'How many of this item do you want to buy?'}</h3>
                    <input 
                        type="number" 
                        name="NewQuantity" 
                        id="newQuantity" 
                        placeholder="NewQuantity"
                        className="bg-gray-100 p-2 rounded-lg border-2 border-gray-200 w-full text-sm text-stone-800 md:text-lg"
                        onChange={(e) => handleChangeEvent(e, 'setQuantity')}
                    />
                </Stack>
                <Stack className="w-full space-y-2 text-sm font-semibold">
                    <h3>New Price</h3>
                    <input 
                        type="number" 
                        name="NewPrice" 
                        id="newPrice" 
                        placeholder="Price"
                        className="bg-gray-100 p-2 rounded-lg border-2 border-gray-200 w-full text-sm text-stone-800 md:text-lg"
                        onChange={(e) => handleChangeEvent(e, 'setPrice')}
                    />
                </Stack>
                <EditOrder_Com 
                    itemId={itemId}
                    orderId={orderId}
                    newOfferPrice={BigInt(offerPrice)}
                    newQuantity={Number(quantity)}
                    handleError={handleError}
                    handleSuccess={handleSuccess}
                />
            </Stack>
        </PopUp>
    );
}
