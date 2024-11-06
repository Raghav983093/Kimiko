import React from "react";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { CATEGORY_TO_STRING } from "@/constants";
import { Textarea } from "@headlessui/react";
import { MediaRenderer } from "thirdweb/react";
import { parseEther } from 'viem';
import { UploadImages } from "./UploadImages";
import useContext from "@/components/StateContextProvider/useContext";
import ListItem from "@/apiComponents/push/seller/ListItem";
import { client } from "@/client";

type Flag = 'setPrice' | 'setQuantity' | 'setDescription' | 'setLocation' ;

export default function Sell() {
    const [priceLimit, setPrice] = React.useState<string>('0');
    const [quantity, setQuantity] = React.useState<string>('0');
    const [description, setDescription] = React.useState<string>('0');
    const [location, setLocation] = React.useState<string>('0');
    const [categorySelector, setSelector] = React.useState<number>(0);
    const [open, setOpen] = React.useState<boolean>(false);
    const [uploadedUri, setUploadedUrl] = React.useState<string[]>([]);

    const { handleError, handleSuccess, activeLink, } = useContext();
    const setrawUri = (arg: string[]) => {
        setUploadedUrl(arg)
    }

    const handleChangeEvent = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, flag: Flag) => {
        e.preventDefault();
        const value = e.currentTarget.value === ''? '0' : e.currentTarget.value;
        switch (flag) {
            case 'setPrice':
                setPrice(value);
                break;
            case 'setLocation':
                setLocation(value);
                break;
            case 'setDescription':
                setDescription(value);
                break;
            case 'setQuantity':
                setQuantity(value);
                break;
            default:
                break;
        }
    }

    return(
        <div hidden={activeLink !== 'Sell'} className="" >
            <div className="bg-kimwhite pt-4 pb-12">
                <nav className="w-full bg-kimnavy h-20 rounded p-4 mb-4">
                    <h3 className="text-xl text-kimwhite font-medium ">{`Create Ad`}</h3>
                </nav>
                <form action="#" method="POST" className="mb-0 space-y-2">
                    <div className="w-full space-y-1 text-sm font-semibold">
                        <label htmlFor="ad-categories" aria-required="true" className="block font-medium text-kimnavy text-xs">Select category</label>
                        <select name="ad-categories" id="ad-categories" className="input">
                            {
                                CATEGORY_TO_STRING.map((text, i) => (
                                    <option key={text} value="small" className="rounded-lg" onClick={() => setSelector(i)}>{text}</option>
                                ))
                            }
                        </select>
                    </div>
                    <Stack className=" p-2 rounded-lg ">
                        <UploadImages setRawUrls={setrawUri} />
                        <button onClick={() => setOpen(!open)} className="w-full px-2 py-3 text-sm border bg-slate-200 ">View Your Uploads</button>
                        <Collapse in={open} timeout="auto" unmountOnExit className={"w-full"}>
                            <Grid container xs={12} spacing={2} >
                                {
                                    // URIs.map((uri) => (
                                    uploadedUri?.map((uri) => (
                                        <Grid item xs={3} key={uri}>
                                            <MediaRenderer 
                                                src={uri}
                                                alt="Image urI not valid"
                                                client={client}
                                                width="100%"
                                                height="20%"
                                            />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Collapse>
                    </Stack>
                    {/* <div className="flex justify-center items-center">
                    </div> */}

                    <label className="block text-kimnavy">
                        <span className="spantag">Quantity</span>
                        <input 
                            type="number" 
                            required
                            name="Quantity" 
                            id="quantity" 
                            className="input"
                            onChange={(e) => handleChangeEvent(e, 'setQuantity')}
                        />
                    </label>
                    <label className="block text-kimnavy">
                        <span className="spantag">Price</span>
                        <input 
                            type="number" 
                            required
                            name="PriceLimit" 
                            id="pricelimit" 
                            className="input"
                            onChange={(e) => handleChangeEvent(e, 'setPrice')}
                        />
                    </label>

                    <div className="w-full space-y-2 text-sm font-semibold">
                        <label htmlFor="ad-categories" aria-required="true" className="block font-medium text-kimnavy text-xs">Location</label>
                        <input 
                            type="text" 
                            required
                            name="Location" 
                            id="location" 
                            className="input"
                            onChange={(e) => handleChangeEvent(e, 'setLocation')}
                        />
                    </div>

                    <label className="block text-kimnavy">
                        <span className="spantag">Description</span>
                        <Textarea 
                            onChange={(e) => handleChangeEvent(e, 'setDescription')}
                            className="input h-[150px] overflow-auto"
                        />
                    </label>

                    <ListItem 
                        quantity={Number(quantity)} 
                        categorySelector={categorySelector} 
                        priceLimit={parseEther(priceLimit)} 
                        imageUrI={uploadedUri[0]} 
                        description={description} 
                        location={location} 
                        handleError={handleError} 
                        handleSuccess={handleSuccess}                    
                    />
                </form>
            </div>
        </div>
    );
}


// const handleSendTransaction = async() => {
//     if(description === '0' || location === '0' || priceLimit === '0' || quantity ==='0') return alert("Please fill the form");
//     setLoading(true);
//     // await listItem({
//         // config,
//         // account,
//         // location,
//         // description,
//         // priceLimit: parseEther(priceLimit),
//         // quantity: Number(quantity),
//         // categorySelector,
//         // imageUrI,
//         // callback
//     // })

// }

// const URIs = ['ipfs://QmRRSt5LCpkuTLaELrqMJQvUJUuTws9dbfwxgaYArJ8nnN/activateEmployee.PNG', 'ipfs://QmRRSt5LCpkuTLaELrqMJQvUJUuTws9dbfwxgaYArJ8nnN/addEmployee.jpg', 'ipfs://QmRRSt5LCpkuTLaELrqMJQvUJUuTws9dbfwxgaYArJ8nnN/addEmployee.PNG']