export const cancelOrderAbi = [
    {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "itemId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "orderId",
            "type": "uint256"
          }
        ],
        "name": "cancelOrder",
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