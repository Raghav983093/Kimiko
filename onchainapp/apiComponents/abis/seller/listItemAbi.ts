export const listItemAbi = [
    {
        "inputs": [
          {
            "internalType": "uint8",
            "name": "quantity",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "categorySelector",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "priceLimit",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "imageUrI",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "location",
            "type": "string"
          }
        ],
        "name": "listItem",
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