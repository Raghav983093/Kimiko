import React, { useCallback } from 'react';
import { PopUp } from '@/components/common/PopUp';
import { VoidFunc } from '@/interfaces';
import Divider from "@mui/material/Divider";
import { useConnect, useAccount } from 'wagmi';

export const ConnectReminder: React.FC<{handleModalClose: VoidFunc, modalOpen: boolean}> = ({modalOpen, handleModalClose}) => {
    const { isConnected, isConnecting } = useAccount();
    const { connectors, connect } = useConnect();
   
    const createWallet = useCallback(() => {
      const coinbaseWalletConnector = connectors.find(
        (connector) => connector.id === 'coinbaseWalletSDK'
      );
      if (coinbaseWalletConnector) {
        connect({ connector: coinbaseWalletConnector });
      }
    }, [connectors, connect]);

    return(
        <PopUp { ...{handleModalClose, modalOpen } } >
            <div className='bg-kimwhite w-full h-[200px] rounded-lg p-2 space-y-2'>
                <div className='w-full flex justify-between items-center text-kimnavy p-2 h-[50px]'>
                    <h3 className=' text-sm tracking-tight font-black text-center text-kimnavy/70  '>{"Oops! Not Connected"}</h3>
                    <button className=' rounded-lg text-sm font-semibold focus:ring-1 px-2'>x</button>
                </div>
                <Divider />
                <div className='flex justify-center items-center text-sm mt-[40px] font-medium h-[100px]'>
                  <button disabled={isConnecting || isConnected }  onClick={createWallet} className="w-[70%] bg-kimred/80 p-5 rounded-full text-kimwhite font-semibold hover:shadow-md hover:shadow-kimdeepnavy">
                    {"Sign in/CreateWallet"}
                  </button>
                </div>
            </div>
        </PopUp>
    )
}



// import React, { useCallback } from 'react';
// import { useConnect } from 'wagmi';
// import { CoinbaseWalletLogo } from './CoinbaseWalletLogo';
 
// const buttonStyles = {
//   background: 'transparent',
//   border: '1px solid transparent',
//   boxSizing: 'border-box',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   width: 200,
//   fontFamily: 'Arial, sans-serif',
//   fontWeight: 'bold',
//   fontSize: 18,
//   backgroundColor: '#0052FF',
//   paddingLeft: 15,
//   paddingRight: 30,
//   borderRadius: 10,
// };
 
