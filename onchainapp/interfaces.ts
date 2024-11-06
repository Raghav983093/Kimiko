// import { Bytes } from "ethers";
// import { IFactory } from "./typechain-types/contracts/interfaces/IFactory";
import { WaitForTransactionReceiptReturnType } from "wagmi/actions";
export type WagmiConfig = import("wagmi").Config;
export type TxnStatus = "Pending" | "Confirming" | "Confirmed" | "Reverted" | "Failed";
export type Str = string;
export type Address = `0x${string}`;
export type SectionId = "Home" | "Sell" | "Profile";
export type VoidFunc = () => void;
export type Data = Readonly<Item[]>;
export type TransactionCallback = (arg: TransactionCallbackArg) => void;
export type Message = string;
export type Orders = Readonly<Order[]>;
export type ContentType = "cartContent" | "selectedAsset" | "assetType" | "";
export type Anchor = "top" | "left" | "bottom" | "right";
export type ToggleDrawer = (anchor: Anchor, open: boolean, cType: ContentType) => (event: React.KeyboardEvent | React.MouseEvent) => void
export type ScrollToSection = (arg: SectionId, seller?:Address) => void; 

export interface CartItem {
  itemId: bigint;
  quantity: bigint;
  offerPrice: bigint;
  item: Item;
}

export interface Info {
  destination: string;
  contacts: string;
}
export interface Order {
  quantity: number;
  date: number;
  offerPrice: bigint;
  commitment: bigint;
  customer: string;
  stage: number;
  info: Info;
  firstSigner: string;
}

export interface ItemInfo {
  quantity: bigint;
  id: bigint;
  priceLimit: bigint;
  description: string;
  location: string;
  orders: Orders;
}

export interface ItemMetadataStruct {
  category: number;
  uri: string;
}

export interface Item {
  seller: string;
  info: ItemInfo;
  meta: ItemMetadataStruct;
}

export interface TransactionCallbackArg {
  message?: Message; 
  result?: TrxnResult;
  txDone: boolean;
}

export interface TrxnResult {
  wait?: WaitForTransactionReceiptReturnType;
  data: Data;
}

export interface ListItemParams extends Config {
  quantity: number;
  categorySelector: number;
  priceLimit: bigint;
  imageUrI: string;
  description: string;
  location: string;
}

export interface StartOrderParams extends Config {
  requestedQuantity: number;
  itemId: bigint;
  offerPrice: bigint;
  destinationAddr: string;
  contact: string;
}

export interface EditOrderParams extends Config {
  newQuantity: number;
  itemId: bigint;
  newOfferPrice: bigint;
  orderId: bigint;
}

export interface MoveOrderParams extends Config{
  stageSelector: number;
  itemId: bigint; 
  orderId: bigint;
}

export interface Config {
  config: WagmiConfig;
  account: Address;
  callback?: TransactionCallback; 
}

export interface CommonParam extends Config {
  orderId: bigint;
  itemId: bigint;
}
















export interface FooterProps {
  scrollToSection: ScrollToSection;
  activeLink: SectionId;
}

export interface DrawerState { 
  top: boolean; 
  left: boolean; 
  bottom: boolean; 
  right: boolean;
}

export interface HomeProps {
  handleSearch: (arg: React.ChangeEvent<HTMLInputElement>) => void;
  toggleDrawer: ToggleDrawer; 
  drawerState: DrawerState;
  activeLink: SectionId; 
  scrollToSection: ScrollToSection; 
  handleButtonClick: (arg: string) => void;
}

export interface HeaderProps {
  scrollToSection: ScrollToSection;
  handleSearch: (arg: React.ChangeEvent<HTMLInputElement>) => void;
  activeLink: SectionId;
  toggleDrawer: ToggleDrawer;
  items: CartItem[];
}

export enum CoinCategory { "MEME", "NFT", "DEFI", "GOVERNANCE", "RWA", "GAMING", "YIELD", "SPORT", "PRIVACY", "METAVERSE", "ALL" }


// export interface FormattedData {
//   info: 
//   seller: 
//   meta:
// }

