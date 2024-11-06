"use client"

import React from "react";
import Divider from "@mui/material/Divider";
import { HowTos } from "./How-Tos";
import { ItemsView } from "./ItemsView";
import { Categories } from "./Categories";
import { FilteredCatgeory } from "./Categories/FilteredCatgeory";
import { ConnectReminder } from "./ConnectReminder";
import { useAccount } from "wagmi";
import useContext from "@/components/StateContextProvider/useContext";

export const Home: React.FC = () => {
    const [modalOpen, setModal] = React.useState<boolean>(false);
    const { activeLink, showFilteredCategory } = useContext();

    const handleModalClose = () => setModal(!modalOpen);
    const { isConnected, address } = useAccount();

    React.useEffect(() => {
        if(!isConnected){
            setModal(true);
        }
        if(isConnected && address) {
            setModal(false);
        }
    }, [isConnected, address]);

    return (
        <div hidden={activeLink !== 'Home'}>
            {
                showFilteredCategory? <FilteredCatgeory /> : 
                    <div className="grid gap-6">
                        <HowTos />
                        <Categories/>
                        <Divider />
                        <ItemsView />
                    </div>
            }
            <ConnectReminder {...{handleModalClose, modalOpen}} />
        </div>
    )
}
