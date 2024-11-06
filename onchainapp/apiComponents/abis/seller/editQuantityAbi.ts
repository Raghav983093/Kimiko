export const editQuantityAbi = [
    {
        "inputs": [
          {
            "internalType": "uint24",
            "name": "newQuantity",
            "type": "uint24"
          },
          {
            "internalType": "uint256",
            "name": "itemId",
            "type": "uint256"
          }
        ],
        "name": "editQuantity",
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