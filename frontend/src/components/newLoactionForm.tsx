import React, { useState } from "react";
import ImagePreview from "./ui/imagePreview";
import { Button } from "./ui/button";
import { InputNoBorder } from "./ui/inputNoBorder";
import MapImage from "../assets/SignUpPageImage.png";

export function NewLocationForm(){

    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if(fileList && fileList.length > 0){
            setFile(fileList[0]);
        }else {
            setFile(null);
        }
    }

    const handleSubmit = (event:  React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(file);
    }

    return(
        <div className="max-w-105 min-h-189.75 my-auto shadow-[0_0_10px_0_rgba(0,0,0,0.2)] px-6 pb-6 rounded-2xl pt-4">
            <form onSubmit={handleSubmit} className="flex flex-col items- gap-6">
                <label htmlFor="file-upload" className="cursor-pointer group">
                    <p className="text-[16px] font-medium mb-2">Upload image:</p>
                    <ImagePreview file={file} />
                </label>
                
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />

                <div className="w-full max-h-63.75 overflow-hidden rounded-[19px]">
                    <img src={MapImage} alt="Map" />
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <p className="text-[16px] weight-[500]! leading-[150%]">Location</p>
                        <textarea placeholder="2118 Thornridge Cir. Syracuse, Connecticut 35624" className="file:text-foreground shadow-[0_0_10px_0_rgba(0,0,0,0.2)] py-2 placeholder:leading-[150%] px-4 placeholder:text-dark placeholder:text-[12px] placeholder:font-medium placeholder:font-poppins  selection:text-primary-foreground h-10 w-full min-w-0 border-2 border-transparent bg-transparent text-base transition-[color,box-shadow] outline-none file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed md:text-sm min-h-16 rounded-2xl aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"/>
                    </div>
                                    
                    <Button variant="default" type="submit" className="w-full">Add place</Button>
                </div>
            </form>
        </div>
    )
}