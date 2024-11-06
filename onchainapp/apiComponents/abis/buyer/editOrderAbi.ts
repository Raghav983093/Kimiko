export const editOrderAbi = [
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
          },
          {
            "internalType": "uint256",
            "name": "newOfferPrice",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "orderId",
            "type": "uint256"
          }
        ],
        "name": "editOrder",
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