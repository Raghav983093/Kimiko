import React from "react";
import ItemComponent from "./Item";
import Box from "@mui/material/Box";
import { ShowDetail } from "../Categories/FilteredCatgeory/ShowDetail";
import useContext from "@/components/StateContextProvider/useContext";

export const ItemsView = () => {
    const  { storage: { data }, showDetail } = useContext();

    return(
        <Box className="pb-[20px]">
            {
                showDetail? <ShowDetail /> : 
                    <div className={`container grid grid-col-1 gap-4`}>
                        {
                            data.map((data_, i) => (
                                <div key={i}>
                                    <ItemComponent item={data_} />
                                </div>
                            ))
                        }
                    </div>
            }
        </Box>
    );
} 