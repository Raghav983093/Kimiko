export const cancelOrderAbi = [
    {
        "inputs": [
          {
            "internalType": "uint8",
            "name": "stageSelector",
            "type": "uint8"
          },
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
        "name": "acceptOrder",
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