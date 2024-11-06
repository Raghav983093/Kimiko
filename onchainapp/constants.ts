import { parseEther, zeroAddress } from 'viem';
import { Data, Item } from './interfaces';
import { encode } from './utilities';
import { formatAddr } from './apiComponents/contractAddresses';

export const ERROR = [
  'execution reverted: No approval to spend', 
  'execution reverted: User denied transaction',
  "MetaMask Tx Signature: User denied transaction signature.",
  "Transaction could not be completed"
];
export const CONFIRMATIONS = 3; // 3 blocks
export enum CATEGORY { FASHION, ELECTRONICS, PHONESNTABLETS, FURNITURES, VEHICLES, ANIMALSNPETS, EQUIPMENTSNTOOLS, REPAIRNCONSTRUCTION, SOFTWARES, BABIESNKIDS }
export const CATEGORY_TO_STRING = [ "Fashion", "Electronics", "Phones & Tables", "Furnitures", "Vehicles", "Animals & Pets", "Equipments & Tools", "Repair & Construction", "Software", "Babies & Kids" ]
export const CATEGORY_IMAGE_URIS = [
  "/fashion.svg",
  "/electronics.svg",
  "phonesntablets.svg",
  "furnitures.svg",
  "vehicles.svg",
  "animals.svg",
  "equipment.svg",
  "repairs.svg",
  "softwares.svg",
  "babies.svg"
]
export enum STAGESELECTOR { COMMIT, ACCEPTED, REJECTED, CANCELLED, INTRANSIT, DELIVERED }
export const STAGESELECTOR_TO_STRING = [ "Commit", "Accepted", "Rejected", "Cancelled", "In-Transit", "Delivered" ]
export const CLASSNAME = "flex justify-between items-center";

export const flexCenter = "flex justify-center items-center";
export const flexStart = "flex justify-start items-center";
export const flexEnd = "flex justify-end items-center";
export const flexSpread = "flex justify-between items-center";
export const flexEven = "flex justify-evenly items-center";

export const MOCK_DATA : Data = [
  {
    info: {
      description: encode("IPhone 14 Promax. A brand new Iphone 14 designed to bring you a soothing experience. Water-proof, string and durable"), 
      id: 0n, 
      location: encode("Shop 59, XYZ plaza, Ikeja, Lagos"),
      orders: [{
        commitment: parseEther('340'),
        customer: zeroAddress,
        date: new Date().getTime(),
        firstSigner: zeroAddress,
        info: {contacts: encode("tty@gmail.com, 07030000000"), destination: encode("24, Kenge street, Iwo rd, Ibadan")},
        offerPrice: parseEther('170'),
        quantity: 2,
        stage: STAGESELECTOR.COMMIT
      }],
      priceLimit: parseEther('200'),
      quantity: 4n
    },
    seller: formatAddr(zeroAddress),
    meta: {category: CATEGORY.ELECTRONICS, uri: encode("https://somelink")}
  },
  {
    info: {
      description: encode("Yamaha Mejesty 2017, Black with brand New tyres"), 
      id: 1n, 
      location: encode("Muri Okunola, V/I, Lagos"),
      orders: [{
        commitment: parseEther('600'),
        customer: zeroAddress,
        date: new Date().getTime(),
        firstSigner: zeroAddress,
        info: {contacts: encode("majesty@gmail.com, 07030007800"), destination: encode("109, Buluku street, Warri, Delta State")},
        offerPrice: parseEther('600'),
        quantity: 1,
        stage: STAGESELECTOR.COMMIT
      }],
      priceLimit: parseEther('650'),
      quantity: 1n
    },
    seller: formatAddr(zeroAddress),
    meta: {category: CATEGORY.VEHICLES, uri: encode("https://somelink")}
  },
  {
    info: {
      description: encode("Toyota Corolla 2014, Gray with brand New tyres"), 
      id: 2n, 
      location: encode("VGC, Ajah, Lagos"),
      orders: [],
      priceLimit: parseEther('6650'),
      quantity: 1n
    },
    seller: formatAddr(zeroAddress),
    meta: {category: CATEGORY.VEHICLES, uri: encode("https://base.org")}
  }
]

export const MOCK_ITEM : Item = {
  seller: zeroAddress,
  info: {
    quantity: 0n,
    id: 0n,
    priceLimit: 0n,
    description: '',
    location: '',
    orders: []
  },
  meta: {
    category: 0,
    uri: ''
  }
}