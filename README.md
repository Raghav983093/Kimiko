# Welcome to Onchainapp


## Inspiration

## Why Onchainapp
Onchainapp is an onchain verison of local marketplace where local artisans, small business owners, and individual can sell goods using cryptocurrencies thereby increasing access to a wider customer base globally.

## Relevance
Many African artisans lack access to global e-commerce platforms; this tool would empower them to sell their goods and receive payments in crypto.

## How We Built it
Onchainapp app was carved as user-centric hybrid focusing on onboarding millions of African by harnessing web3 potentials while abstracting away its complexities giving users a nice web2 feel. The project combines on-chain code (the Kimiko contracts), client code,IPFS (Interplantary File System), and a backend. The client sends requests to the backend (web3) to interact with the blockchain. We used the decentralized storage - IPFS client via Thirdweb sdk to store and retrieve images. For demo purposes and to manage time, we directly fetch data from the blockchain and relay it to the front end. This method may be slow but we plan to subscribe to a more intuitive service in the future.

Our smart contracts are deployed on BaseSepolia with the following contract addresses:

```
    C:\Users\Bobman\Desktop\web3\kimiko\contracts_ts>yarn testnet
    yarn run v1.22.22
    $ hardhat deploy --network testnet --export deployments/contracts.json
    Nothing to compile
    No need to generate any newer typings.
    deploying "RoleBased" (tx: 0x99114b3318c57ef296ef5444646455fe42dbd7719169dd507fe5abf154e7530f)...: deployed at 0xe09e23F8a8032BB39326098802c970f9b48D726C with 450532 gas
    RoleBased Manager deployed to: 0xe09e23F8a8032BB39326098802c970f9b48D726C
    deploying "TestUSDT" (tx: 0x7dc6edf700ace53322a54fab621ede09e50faad7fce87784ccb5ac0d8215f504)...: deployed at 0xb28721f7b977D64F9401161EA91bC25D59F25308 with 690373 gas
    Test Asset deployed to: 0xb28721f7b977D64F9401161EA91bC25D59F25308
    deploying "Factory" (tx: 0xb5f7905c736b3303926716fea1fb015cf129a4c0d8ac39b9445839a3bcb2f9b0)...: deployed at 0x1a375D2aEF1370B306B4aCc9d930e3C2defaBF9c with 2966278 gas
    Factory deployed to: 0x1a375D2aEF1370B306B4aCc9d930e3C2defaBF9c
    deploying "BuyerV1" (tx: 0x55111711e81c582054a36ab1a9c67e2c8f24cf0746e022ee70eca58db08195f5)...: deployed at 0x99C62eF80CA0ECc942994d407ecA89dDE3625F7d with 2242233 gas
    Buyer contract deployed to: 0x99C62eF80CA0ECc942994d407ecA89dDE3625F7d
    deploying "SellerV1" (tx: 0xb334e25a9d40656758eb9b20537996d1ebd55e49f1745365fde939dd71d50bb0)...: deployed at 0xfFF63Bc9aa8343e10870f871f7BE2Fd8a4D844e9 with 1885520 gas
    Seller contract deployed to: 0xfFF63Bc9aa8343e10870f871f7BE2Fd8a4D844e9
    Done in 62.04s.

```

We leverage [onchainkit](https://onchainkit.xyz/) for a seemless developer and user experinces.

Contracts: Written in Solidity, can be found here: [https://github.com/bobeu/kimiko/contracts-ts](https://github.com/Raghav983093/Onchainapp)

Frontend: Written in Typescript with React, can be found here: [https://github.com/bobeu/kimiko/onchainapp](https://github.com/Raghav983093/Onchainapp)

Web3 Backend: Written using blend of OnchainKit, Wagmi and EthersJs, can be found here: https://github.com/bobeu/kimiko/onchainapp/apiComponents



# To interact, clone the repo

Git clone 
   ``` https://github.com/Raghav983093/Onchainapp ```

## For smart contracts

       cd kimiko/contracts_ts  
       yarn install  

## Compile
      yarn compile

## Testing
     yarn test

## Deploy
    yarn deploy testnet
    yarn deploy mainnet

## Frontend
    cd kimiko/onchainapp
    yarn install

## Run dev server
    yarn run dev

## Build
     yarn build

## Live 
    yarn start
