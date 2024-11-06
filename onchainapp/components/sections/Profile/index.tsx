import React from "react";
import useContext from "@/components/StateContextProvider/useContext";

// const filterDataForCurrentUser = ({data, user, isSeller} : {data: Data, user: Address, isSeller: boolean}) => {
//     // const filtered = data.filter((d_) => isSeller? user.toLowerCase() === d_.seller.toLowerCase() )
// }

export default function Profile() {
    const { activeLink } = useContext();
    // const { address } = useAccount();

    // const handleClick = (arg: Msg) => {
    //     switch (arg) {
    //         case 'ads':
                
    //             break;
    //         case 'orders':
                
    //             break;
        
    //         default:
    //             break;
    //     }
    // }

    return(
        <div hidden={activeLink !== 'Profile'} className="h-screen">
            Profile
        </div>
    );
}

// type Msg = 'ads' | 'orders';
// const PROFILE_CONTENT_PLACEHOLDER = ['My ADs', 'My Orders', 'Feedbacks', 'Notifications']