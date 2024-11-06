import { MOCK_DATA, MOCK_ITEM } from "./constants";
import { Item, TrxnResult, SectionId } from "./interfaces"
import { TransactionError, TransactionResponse } from "@coinbase/onchainkit/transaction";

const voidFunc = (): void => {
    throw new Error("Function not implemented.");
}

export type VoidFunc = () => void
export interface StateContextProps {
    darkMode: boolean;
    message: string;
    storage: TrxnResult;
    categorySelector: number;
    selectedItem: Item;
    showDetail: boolean;
    requestToEditOrder: boolean;
    requestToPlaceOrder: boolean;
    showFilteredCategory: boolean;
    activeLink: SectionId;
    handleError: (err: TransactionError) => void;    
    handleSuccess: (err: TransactionResponse) => void;    
    goToPage: (arg: SectionId) => void;
    toggleMode: VoidFunc;
    togglePlaceOrderRequest: VoidFunc;
    toggleEditOrderRequest: VoidFunc;
    toggleShowdetail: VoidFunc;
    setselectedItem: (arg: Item) => void,
    setCategorySelector: (arg: number) => void;
    setstate: (arg: TrxnResult) => void;
    setmessage: (arg: string) => void;
    displaFilteredCategory : VoidFunc;

}

export const storageInitialValueType : StateContextProps = {
    storage: { data: MOCK_DATA },
    categorySelector: 0,
    showDetail: false,
    activeLink: 'Home',
    message: '',
    darkMode: false,
    selectedItem: MOCK_ITEM,
    requestToEditOrder: false,
    requestToPlaceOrder: false,
    showFilteredCategory: false,
    toggleMode: voidFunc,
    displaFilteredCategory: voidFunc,

    goToPage: function (arg: SectionId): void {
        throw new Error("Function not implemented.");
    },
    handleError: function (arg: TransactionError): void {
        throw new Error("Function not implemented.");
    },
    handleSuccess: function (arg: TransactionResponse): void {
        throw new Error("Function not implemented.");
    },
    setmessage: function (arg: string): void {
        throw new Error("Function not implemented.");
    },
    togglePlaceOrderRequest: voidFunc,
    toggleEditOrderRequest: voidFunc,
    setselectedItem: function (arg: Item): void {
        throw new Error("Function not implemented.");
    },
    setstate: function (arg: TrxnResult): void {
        throw new Error("Function not implemented.");
    },
    setCategorySelector: (arg: number) => {},
    toggleShowdetail: voidFunc,
}