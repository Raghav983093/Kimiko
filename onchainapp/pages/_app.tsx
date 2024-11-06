import '@coinbase/onchainkit/styles.css';
import '../styles/globals.css';
import React from 'react';
// import "@rainbow-me/rainbowkit/styles.css";
import NextHead from 'next/head';
import type { AppProps } from 'next/app';
import { cookieToInitialState } from 'wagmi';
import OnchainProvider from "../components/OnchainProvider";
import { useWagmiConfig } from '@/wagmiConfig';

export default function App({ Component, pageProps }: AppProps) {
  const initialState = cookieToInitialState(useWagmiConfig());
  return (
    <React.Fragment>
      <NextHead>
        <title>Kimiko</title>
      </NextHead>
      {
        <OnchainProvider initialState={initialState}>
            <Component {...pageProps}/>
        </OnchainProvider>
      }
    </React.Fragment>
  );
}
