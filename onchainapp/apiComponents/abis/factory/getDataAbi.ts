export const getDataAbi = [
    {
        "inputs": [],
        "name": "getData",
        "outputs": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "seller",
                "type": "address"
              },
              {
                "components": [
                  {
                    "internalType": "uint256",
                    "name": "quantity",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "priceLimit",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bytes",
                    "name": "description",
                    "type": "bytes"
                  },
                  {
                    "internalType": "bytes",
                    "name": "location",
                    "type": "bytes"
                  },
                  {
                    "components": [
                      {
                        "internalType": "uint24",
                        "name": "quantity",
                        "type": "uint24"
                      },
                      {
                        "internalType": "uint32",
                        "name": "date",
                        "type": "uint32"
                      },
                      {
                        "internalType": "uint256",
                        "name": "offerPrice",
                        "type": "uint256"
                      },
                      {
                        "internalType": "uint256",
                        "name": "commitment",
                        "type": "uint256"
                      },
                      {
                        "internalType": "address",
                        "name": "customer",
                        "type": "address"
                      },
                      {
                        "internalType": "enum IFactory.Stage",
                        "name": "stage",
                        "type": "uint8"
                      },
                      {
                        "components": [
                          {
                            "internalType": "bytes",
                            "name": "destination",
                            "type": "bytes"
                          },
                          {
                            "internalType": "bytes",
                            "name": "contacts",
                            "type": "bytes"
                          }
                        ],
                        "internalType": "struct IFactory.Info",
                        "name": "info",
                        "type": "tuple"
                      },
                      {
                        "internalType": "address",
                        "name": "firstSigner",
                        "type": "address"
                      }
                    ],
                    "internalType": "struct IFactory.Order[]",
                    "name": "orders",
                    "type": "tuple[]"
                  }
                ],
                "internalType": "struct IFactory.ItemInfo",
                "name": "info",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "enum IFactory.Category",
                    "name": "category",
                    "type": "uint8"
                  },
                  {
                    "internalType": "bytes",
                    "name": "uri",
                    "type": "bytes"
                  }
                ],
                "internalType": "struct IFactory.ItemMetadata",
                "name": "meta",
                "type": "tuple"
              }
            ],
            "internalType": "struct IFactory.Item[]",
            "name": "items",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
    },
] as const;