import type { HardhatUserConfig } from "hardhat/config";
import { config as dotconfig } from "dotenv";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
// import "@nomiclabs/hardhat-web3";
// import "@nomicfoundation/hardhat-ethers"
// import "@nomicfoundation/hardhat-viem";
// import "@nomiclabs/hardhat-ethers";

// import "@nomicfoundation/hardhat-ethers"


// import "@nomicfoundation/hardhat-toolbox-viem";

dotconfig();

const PRIVATE_KEY = String(process.env.PRIVATE_KEY_0xD07);
const PRIVATE_KEY_MAINNET = String(process.env.PRIVATE_KEY_M);

const config: HardhatUserConfig = {
    networks: {
        testnet: {
            url: "https://sepolia.base.org",
            accounts: [PRIVATE_KEY],
        },
        mainnet: {
            url: "https://mainnet.base.org",
            accounts: [PRIVATE_KEY],
        },
    },
    // etherscan: {
    //     // apiKey: {
    //     //     testnet: String(process.env.BASESCAN_API_KEY),
    //     //     mainnet: String(process.env.BASESCAN_API_KEY),
    //     // },
    //     customChains: [
    //         {
    //             network: "testnet",
    //             chainId: 84532,
    //             urls: {
    //                 apiURL: "https://sepolia.base.org",
    //                 browserURL: "https://",
    //             },
    //         },
    //         {
    //             network: "mainnet",
    //             chainId: 8453,
    //             urls: {
    //                 apiURL: "https://mainnet.base.org",
    //                 browserURL: "https://",
    //             },
    //         },
    //     ],
    // },
    namedAccounts: {
        deployer: {
          default: 0,
          84532: `privatekey://${PRIVATE_KEY}`,
          8453: `privatekey://${PRIVATE_KEY_MAINNET}`,
        },
        feeTo: {
            default: 0,
            84532: `privatekey://${PRIVATE_KEY}`,
            8453: `privatekey://${PRIVATE_KEY_MAINNET}`,
        }
      },
    
    solidity: {
    version: "0.8.20",
    settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
            enabled: true,
            runs: 200,
        },
            evmVersion: "byzantium"
        }
    },
};

export default config;

// 0xDff4BE7Ba857bf866AD364860Da2d53459907600