import  { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { useMemo } from 'react';
import { coinbaseWallet, metaMaskWallet, rainbowWallet } from "@rainbow-me/rainbowkit/wallets";
import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { NEXT_PUBLIC_WC_ID } from "./envVariables";

export function useWagmiConfig() {
    const projectId = NEXT_PUBLIC_WC_ID ?? '';
    if(!projectId) {
        throw new Error('Please provider Wallet connect Id to use more wallets');
    }

    return useMemo(
        () => {
            const connectors = connectorsForWallets(
                [
                    {
                        groupName: 'Recommended Wallet',
                        wallets: [coinbaseWallet]
                    },
                    {
                        groupName: 'Other Wallets',
                        wallets: [rainbowWallet, metaMaskWallet]
                    }
                ],
                {

                    appName: 'Kimiko',
                    projectId
                },
            );

            const wagmiConfig = createConfig({
                chains: [base, baseSepolia],
                multiInjectedProviderDiscovery: false,
                connectors,
                ssr: true,
                storage: createStorage({
                    storage: cookieStorage,
                }),
                transports: {
                    [base.id] : http(),
                    [baseSepolia.id] : http()
                }
            });

            return wagmiConfig
        },
        [projectId]
    );
}   
