import React from "react";
import { upload  } from "thirdweb/storage";
import { useDropzone } from "react-dropzone";
import { client } from "@/client";
import Tooltip from "@mui/material/Tooltip";
import _ from "lodash";

export const UploadImages: React.FC<{setRawUrls: (arg: string[]) => void}> = ({setRawUrls}) => {
    const [imageFiles, setImageFile] = React.useState<File[]>([]);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        _.forEach(e.target.files, file => {
            if(file) {
                setImageFile((prev) => {
                    const filtered = prev?.filter((item) => item.name === file.name);
                    if(!filtered.length || filtered.length === 0){
                        prev.push(file);
                    }
                    return prev;
                })
            }
        })
        console.log("Taget", imageFiles)

    }

    const uploadImages =  async() => {
        if(imageFiles?.length){
            const uris = await upload({files: imageFiles, client});
            console.log("Urls:" , uris)
            setRawUrls(uris);
        } else {
            alert("Please upload image")
        }
    }

    const { getRootProps, getInputProps } = useDropzone({onDrop: uploadImages});

    return(
        <div { ...getRootProps } className="text-kimnavy space-y-2">
            <div className="space-y-2 bg-kimnavy/10 border border-dashed border-kimnavy/60 p-2 rounded-lg ">
                <div className="flex justify-start gap-1">
                    <h3 className="text-xs">Upload images</h3>
                    <Tooltip title="Upload at least 3 images. Max size/image - 4MB">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 text-kimnavy">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                            </svg>
                        </span>
                    </Tooltip>
                </div>
                <input 
                    { ...getInputProps }
                    type="file" 
                    id="uploadBt" 
                    multiple
                    className="place-content-center rounded-lg block w-full text-xs text-kimnavy/60 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-kimnavy/5 file:p-4 file:text-kimnavy/70 file:cursor-pointer hover:file:shadow-inner" 
                    onChange={(e) => handleFileChange(e)}
                />
            </div>
            <button className="border border-kimnavy/20 w-full rounded-ful py-3 text-sm bg-slate-200 text-kimnavy/60 hover:bg-slate-100 focus:shadow-inner cursor-pointer" onClick={uploadImages}>Upload</button>
            <div className="space-y-1">
                {
                    imageFiles?.map((file, id) => (
                        <div key={id} className="w-full flex justify-between items-center text-xs font-semibold px-2 py-1 rounded-lg border border-dashed border-kimnavy ">
                            <h3>{file.name}</h3>
                            <h3>{`${Math.abs(file.size)/1024}KB`}</h3>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}