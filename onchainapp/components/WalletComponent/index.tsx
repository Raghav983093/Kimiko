import React from 'react';
import { 
    Address,
    Avatar,
    EthBalance,
    Identity,
    Name
} from '@coinbase/onchainkit/identity';
import { 
    ConnectWallet,
    ConnectWalletText,
    Wallet,
    WalletDropdown,
    WalletDropdownBasename,
    WalletDropdownDisconnect,
    WalletDropdownFundLink,
    WalletDropdownLink
} from '@coinbase/onchainkit/wallet';

type WalletComponentParams = {
    text?: string;
    className?: string;
    withWalletAggregator?: boolean;
}

export default function WalletComponent({className, text, withWalletAggregator = false} : WalletComponentParams) {
    return(
        <Wallet>
            <ConnectWallet withWalletAggregator={withWalletAggregator} className={`${className} bg-transparent border hover:bg-transparent hover:text-yellow-200`} >
                <ConnectWalletText>{text}</ConnectWalletText>
                <Avatar className='h-6 w-6'/>
                <Name />
            </ConnectWallet>
            <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick={true}>
                    <Avatar />
                    <Name />
                    <Address />
                    <EthBalance />
                </Identity>
                <WalletDropdownBasename />
                <WalletDropdownLink icon={"wallet"} href='https://wallet.coinbase.com'>
                    Go to Wallet Dashboard
                </WalletDropdownLink>
            </WalletDropdown>
            <WalletDropdownFundLink />
            <WalletDropdownDisconnect />
        </Wallet>
    );
}