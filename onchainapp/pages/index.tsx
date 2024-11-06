"use client"

import React from "react";
import { Home as HomePage } from "@/components/sections/Home";
import Layout from "@/components/Layout";
import Notification from "@/components/Notification";
import Sell from "@/components/sections/Sell";
import Profile from "@/components/sections/Profile"
import { Item, SectionId, TrxnResult } from '@/interfaces';
import { MOCK_DATA, MOCK_ITEM } from '@/constants';
import { StateContextProvider } from '@/components/StateContextProvider';
import { TransactionError, TransactionResponse } from "@coinbase/onchainkit/transaction";
import { getData } from "../apiComponents/get";
import { useAccount, useConfig } from "wagmi";

export default function Index() {
  const [ darkMode, setMode] = React.useState<boolean>(false);
  const [ message, setMessage] = React.useState<string>("");
  const [ activeLink, setActiveLink ] = React.useState<SectionId>("Home");
  const [ selectedItem, setSelectedItem] = React.useState<Item>(MOCK_ITEM);
  const [ storage, setStorage ] = React.useState<TrxnResult>({data: MOCK_DATA});
  const [ categorySelector, setSelector] = React.useState<number>(0);
  const [ showDetail, setShowDetail ] = React.useState<boolean>(false);
  const [ requestToEditOrder, setEditRequest ] = React.useState<boolean>(false);
  const [ requestToPlaceOrder, setPlaceOrderRequest ] = React.useState<boolean>(false);
  const [ showFilteredCategory, setShowFilteredCategory ] = React.useState<boolean>(false);

  const { isConnected, connector } = useAccount();
  const config = useConfig();
  const setstate = (arg: TrxnResult) => setStorage(arg);
  const setmessage = (arg: string) => setMessage(arg);
  const setCategorySelector = (arg: number) => setSelector(arg);
  const toggleShowdetail = () => setShowDetail(!showDetail);
  const togglePlaceOrderRequest = () => setPlaceOrderRequest(!requestToPlaceOrder);
  const toggleEditOrderRequest = () => setEditRequest(!requestToEditOrder);
  const displaFilteredCategory = () => setShowFilteredCategory(!showFilteredCategory);
  const toggleMode = () => setMode(!darkMode);
  const setselectedItem = (arg: Item) => {
    setSelectedItem(arg);
    toggleShowdetail()
  };

  const handleError = (err: TransactionError ) => setMessage(err.message);

  const handleSuccess = (success: TransactionResponse ) => {
    setMessage(`Success: ${success.transactionReceipts[0].transactionHash}`);
  }
  
  const goToPage = (sectionId: SectionId) => {
    setActiveLink(sectionId);
  };

  React.useEffect(() => {
    const ctrl = new AbortController();
    setTimeout(() => {
      if(isConnected && connector) {
        const fetchData = async() => {
          const data = await getData({ config });
          console.log("Dta", data)
          setstate({data});
        }
        fetchData();
      }
    }, 10000);
    return () => {
      clearTimeout(10000);
      ctrl.abort();
    };
  }, [isConnected, connector, config, setstate]);

  return (
    <StateContextProvider
        value={{
        storage,
        showDetail, 
        categorySelector, 
        selectedItem,
        requestToEditOrder,
        requestToPlaceOrder,
        activeLink,
        showFilteredCategory,
        darkMode,
        message,
        setmessage,
        handleError,
        handleSuccess,
        displaFilteredCategory,
        goToPage,
        setstate, 
        toggleMode,
        togglePlaceOrderRequest,
        toggleEditOrderRequest,
        setCategorySelector, 
        toggleShowdetail, 
        setselectedItem, 
      }}
    >
        <Layout>
            <HomePage />
            <Sell />
            <Profile />
            <Notification message={message} />
        </Layout>
    </StateContextProvider>
  );
}
