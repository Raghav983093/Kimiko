import React from "react";
import { PopUp } from "@/components/common/PopUp";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { parseEther } from "viem";
import useContext from "@/components/StateContextProvider/useContext";
import StartOrder_Com from "@/apiComponents/push/buyer/StartOrder_Com";

type Flag = 'setPrice' | 'setQuantity' | 'setDestination' | 'setContact';

export const PlaceOrder: React.FC<{title: string, itemId: bigint}> = ({ title, itemId }) => {
    const [offerPrice, setPrice] = React.useState<string>('0');
    const [quantity, setQuantity] = React.useState<string>('0');
    const [destinationAddr, setDestinationAddr] = React.useState<string>('0');
    const [contact, setContact] = React.useState<string>('0');
    const { requestToPlaceOrder: modalOpen, togglePlaceOrderRequest: handleModalClose, handleError, handleSuccess } = useContext();
    const handleChangeEvent = (e:React.ChangeEvent<HTMLInputElement>, flag: Flag) => {
        e.preventDefault();
        const value = e.currentTarget.value === ''? '0' : e.currentTarget.value;
        switch (flag) {
            case 'setPrice':
                setPrice(value);
                break;
            case 'setContact':
                setContact(value);
                break;
            case 'setDestination':
                setDestinationAddr(value);
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
            <Stack className="space-y-4 p-4 md:p-8 my-10 bg-kimwhite rounded-xl" >
                <div className="flex justify-between items-center text-kimdeepnavy/80">
                    <h3 className="text font-black text-sm">{`Place order for ${title}`}</h3>
                    <button className="bg-yellow-100 text-yellow-800 text-xs rounded-lg p-2 font-bold hover:shadow-md hover:shadow-yellow-200" onClick={handleModalClose}>Close</button>
                </div>
                <Divider sx={{bgcolor: 'white'}}/>
                <Stack className="w-full space-y-2 text-sm font-semibold">
                    <h3>{'How many of this item do you want to buy?'}</h3>
                    <input 
                        type="number" 
                        name="Quantity" 
                        id="quantity" 
                        placeholder="Quantity"
                        className="bg-gray-100 p-2 rounded-lg border-2 border-gray-200 w-full text-sm text-stone-800 md:text-lg"
                        onChange={(e) => handleChangeEvent(e, 'setQuantity')}
                    />
                </Stack>
                <Stack className="w-full space-y-2 text-sm font-semibold">
                    <h3>Price</h3>
                    <input 
                        type="number" 
                        name="Price" 
                        id="price" 
                        placeholder="Price"
                        className="bg-gray-100 p-2 rounded-lg border-2 border-gray-200 w-full text-sm text-stone-800 md:text-lg"
                        onChange={(e) => handleChangeEvent(e, 'setPrice')}
                    />
                </Stack>
                <Stack className="w-full space-y-2 text-sm font-semibold">
                    <h3>{'Where to receive the package'}</h3>
                    <input 
                        type="text" 
                        name="Destination Address" 
                        id="destination" 
                        placeholder="Your address"
                        className="bg-gray-100 p-2 rounded-lg border-2 border-gray-200 w-full text-sm text-stone-800 md:text-lg"
                        onChange={(e) => handleChangeEvent(e, 'setDestination')}
                    />
                </Stack>
                <Stack className="w-full space-y-2 text-sm font-semibold">
                    <h3>Your contact</h3>
                    <input 
                        type="text" 
                        name="Contact" 
                        id="contact"
                        placeholder="Contact"
                        className="bg-gray-100 p-2 rounded-lg border-2 border-gray-200 w-full text-sm text-stone-800 md:text-lg"
                        onChange={(e) => handleChangeEvent(e, 'setContact')}
                    />
                </Stack>
                <StartOrder_Com 
                    contact={contact}
                    destinationAddr={destinationAddr}
                    handleError={handleError}
                    handleSuccess={handleSuccess}
                    itemId={itemId}
                    offerPrice={BigInt(parseEther(offerPrice))}
                    requestedQuantity={Number(quantity)}
                />
            </Stack>
        </PopUp>
    );
}
