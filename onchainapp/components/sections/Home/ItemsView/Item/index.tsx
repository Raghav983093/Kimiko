import * as React from 'react';
import type { Item } from '@/interfaces';
import { decode  } from '@/utilities';
import { formatEther } from 'viem';
import Divider from '@mui/material/Divider';
import { resolveScheme } from 'thirdweb/storage';
import useContext from '@/components/StateContextProvider/useContext';
import { client } from '@/client';

export default function ItemComponent({ item }: {item : Item}) {
    const { setselectedItem } = useContext();
    const { 
        info: { description, priceLimit, location },
        meta: { uri }, 
    } = item;

    const descriptn = decode(description);
    return (
        <div>
            <div className='rounded-lg flex-auto shadow-md shadow-slate-700 cursor-pointer' onClick={() => setselectedItem(item)}>
                <div className='bg-white rounded-t-xl'>
                    <img
                        src={resolveScheme({client, uri: decode(uri)})}
                        alt={descriptn.substring(0, 10)}
                        className="object-cover h-[150px] w-full"
                    />
                </div>
                <Divider />
                <div className='inline-block p-4 space-y-2 text-sky-50'> 
                    <h3 className='font-medium text-kimnavy'>{`$${formatEther(priceLimit)}`}</h3>
                    <h3 className='text-kimdeepnavy font-bold text-lg'>{`${descriptn.substring(0, 15)} ...`}</h3>
                    <h3 className='text-gray-400 font-bold text-xs'>{decode(location)}</h3>
                </div>
            </div>
        </div>
    );
}
