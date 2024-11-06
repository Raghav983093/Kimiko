export const removeItemAbi = [
    {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "itemId",
            "type": "uint256"
          }
        ],
        "name": "removeItem",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
] as const;