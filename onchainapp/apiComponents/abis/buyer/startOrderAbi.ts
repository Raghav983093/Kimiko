export const startOrderAbi = [
    {
        "inputs": [
          {
            "internalType": "uint24",
            "name": "requestedQuantity",
            "type": "uint24"
          },
          {
            "internalType": "uint256",
            "name": "itemId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "offerPrice",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "destinationAddr",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "contact",
            "type": "string"
          }
        ],
        "name": "startOrder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
] as const;