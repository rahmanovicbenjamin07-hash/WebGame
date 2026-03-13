import React, { useState } from "react";
import ImagePreview from "./ui/imagePreview";
import { Button } from "./ui/button";
import { MapContainer, TileLayer, Marker} from "react-leaflet";
import {LocationPicker} from "../components/ui/MapLocationPicke"
import { defaultIcon } from "./ui/MapDeafultsIcon";
import { getLocationName } from "@/utils/LocationName";

export function NewLocationForm(){
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [lat, setLat] = useState<number>(0);
    const [lng, setLng] = useState<number>(0);
    const [locationName,setLocationName] = useState<string>("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if(fileList && fileList.length > 0){
            setFile(fileList[0]);
            setMessage(null);
        }else {
            setFile(null);
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);    

    if (!file) {
        setMessage("No image");
        setIsLoading(false);
        return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("location", locationName);
    formData.append("lat", String(lat));
    formData.append("lng", String(lng));

    try {
        const res = await fetch("http://localhost:3001/location/newLocation", {
        method: "POST",
        body: formData,
    });
        if (!res.ok) {
            setMessage("There was an error adding location!");
            setIsLoading(false);
            return;
        }else{
            setMessage("Location added successfully!");
        }
    } catch (err) {
        setMessage("Failed to add!");
    } finally {
        setIsLoading(false);
    }
}

    return(
        
        <div className="relative max-w-105 min-h-189.75 my-auto shadow-[0_0_10px_0_rgba(0,0,0,0.2)] px-6 pb-6 rounded-2xl pt-4">
           <div className="-top-16 absolute left-0 right-0">
                {message && (
                <div className={`w-full px-4 py-3 rounded-2xl text-sm font-medium text-center flex items-center justify-between
                        ${message.includes("successfully") 
                        ? "bg-green-100 text-green-700 border border-green-200" 
                        : "bg-red-100 text-red-700 border border-red-200"}`}>
                        <span>{message}</span>
                    <button onClick={() => setMessage(null)} className="ml-2 text-current opacity-60 hover:opacity-100 cursor-pointer">✕</button>
                </div>
                )}
            </div> 
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
                    <MapContainer center={[44.6131, 17.9867]} zoomControl={false} zoom={7} className="w-full h-63.75 rounded-[19px] z-0">
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <LocationPicker onLocationSelect={async (lat, lng) => {
                                setLat(lat);
                                setLng(lng);
                                const name = await getLocationName(lat, lng);
                                setLocationName(name);
                            }} />
                        {lat !== 0 && lng !== 0 && ( <Marker position={[lat, lng]} icon={defaultIcon} /> )}  
                    </MapContainer> 
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <p className="text-[16px] weight-[500]! leading-[150%]">Location</p>
                        <textarea value={locationName} readOnly placeholder="2118 Thornridge Cir. Syracuse, Connecticut 35624" className="file:text-foreground shadow-[0_0_10px_0_rgba(0,0,0,0.2)] py-2 placeholder:leading-[150%] px-4 placeholder:text-dark placeholder:text-[12px] placeholder:font-medium placeholder:font-poppins  selection:text-primary-foreground h-10 w-full min-w-0 border-2 border-transparent bg-transparent text-base transition-[color,box-shadow] outline-none file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed md:text-sm min-h-16 rounded-2xl aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"/>
                    </div>
                                    
                    <Button variant="default" type="submit" className="w-full cursor-pointer" disabled={isLoading}>{isLoading ? "Adding..." : "Add Location"}</Button>
                </div>
            </form>
        </div>
    )
}