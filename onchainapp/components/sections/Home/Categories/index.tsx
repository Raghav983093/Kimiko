import React from "react";
import { CATEGORY_IMAGE_URIS, CATEGORY_TO_STRING } from "@/constants";
import Image from "next/image";
import useContext from "@/components/StateContextProvider/useContext";

export const Categories = () => {
    const { setCategorySelector, displaFilteredCategory} = useContext();
    const handleClickCategory = (catId: number) => {
        setCategorySelector(catId);
        displaFilteredCategory();
    }

    return(
        <div className="grid grid-cols-3 gap-2">
            {
                CATEGORY_TO_STRING.map((text, i) => (
                    <div key={text} className="columns-xs" onClick={()=> handleClickCategory(i)}>
                        <div className="place-content-center space-y-2 bg-stone-50 border border-kimred border-opacity-10 rounded-lg p-2 h-[100px] text-xs text-kimnavy cursor-pointer hover:bg-stone-100 active:bg-stone-100" >
                            <div className="h-10 w-10">
                                <Image 
                                    src={CATEGORY_IMAGE_URIS[i]}
                                    alt={`${text} image`}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <h3 className="overflow-hidden">{text}</h3>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}