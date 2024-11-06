"use client"

import React from "react";
import { Data } from "@/interfaces";
import Stack from "@mui/material/Stack";
import ItemComponent from "../../ItemsView/Item";
import Divider from "@mui/material/Divider";
import { ShowDetail } from "./ShowDetail";
import useContext from "@/components/StateContextProvider/useContext";

const filterDataBasedOnCategory = (categorySelector: number, data: Data) => {
    return data.filter((d_) => d_.meta.category === categorySelector);
}

export const FilteredCatgeory : React.FC = () => {
    const { storage: { data }, categorySelector, displaFilteredCategory: back, showDetail } = useContext();
    const filteredCategory = filterDataBasedOnCategory(categorySelector, data);

    return(
        <div className="space-y-4 h-screen">
            {
                !showDetail && 
                    <div className="w-full ">
                        <button
                            onClick={back}
                            className="mb-4 rounded-lg p-2 text-xs text-kimnavy shadow-md hover:text-kimred active:shadow-kimred"
                            
                        >Back</button>
                        <Divider />
                    </div>
            }
            <div className={`grid grid-col-1 gap-4`}>
                {
                    !showDetail ? 
                        filteredCategory.length > 0? filteredCategory.map((item, i) => (
                            <div key={i}>
                                <ItemComponent { ...{item}} />
                            </div>
                        )) : <Stack className="text-center text-lg font-bold">
                            <h3>No AD Found In This Category</h3>
                        </Stack> : <ShowDetail />
                }
            </div>
        </div>
    );
}