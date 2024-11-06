import React from 'react';
import { ThirdwebClient } from 'thirdweb';
// import { download } from "thirdweb/storage";

export const Download : React.FC<{client: ThirdwebClient, uri: string}> = () => {
    // const downloadFile = async() => {
    //     const file = await download({
    //         client,
    //         uri,
    //     });
    // }

    return(
        <div>
            Download
        </div>
    )
}
