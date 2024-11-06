'use client';

import type { ReactNode } from 'react';
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { base } from 'viem/chains';
import { type State, WagmiProvider } from 'wagmi';
import { NEXT_PUBLIC_ONCHAINKIT_CDP_KEY } from '@/envVariables';
import { useWagmiConfig } from '@/wagmiConfig';
import { ThirdwebProvider } from 'thirdweb/react';

const queryClient = new QueryClient();

export default function OnchainProvider ({initialState, children} : {initialState?: State, children: ReactNode}) {
    const wagmiConfig = useWagmiConfig();

    return(
        <ThirdwebProvider>
            <WagmiProvider config={wagmiConfig} initialState={initialState}>
                <QueryClientProvider client={queryClient}>
                    <OnchainKitProvider 
                        apiKey={NEXT_PUBLIC_ONCHAINKIT_CDP_KEY}
                        chain={base}
                        config={{ appearance: { 
                            mode: 'auto',
                            theme: 'base',
                        } }}
                    >
                        <RainbowKitProvider modalSize='compact'>
                            { children }
                        </RainbowKitProvider>
                    </OnchainKitProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </ThirdwebProvider>
    );
}
