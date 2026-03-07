import React, { useState } from "react";
import ImagePreview from "./ui/imagePreview";
import { Button } from "./ui/button";
import { MapContainer, TileLayer, Marker} from "react-leaflet";
import {LocationPicker} from "../components/ui/MapLocationPicke"
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconAnchor: [12, 41],
});


export function NewLocationForm(){

    const [file, setFile] = useState<File | null>(null);
    const [location, setLocation] = useState("");
    const [lat, setLat] = useState<number>(0);
    const [lng, setLng] = useState<number>(0);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if(fileList && fileList.length > 0){
            setFile(fileList[0]);
        }else {
            setFile(null);
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
        console.error("No image");
        return;
    }


    const formData = new FormData();
    formData.append("image", file);
    formData.append("location", location);
    formData.append("lat", String(lat));
    formData.append("lng", String(lng));

    const res = await fetch("http://localhost:3001/location/newLocation", {
        method: "POST",
        body: formData,
    });


    if (!res.ok) {
        const err = await res.json();
        console.error("Backend error:", err);
        return;
    }
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
                    <MapContainer center={[44.0, 17.0]} zoom={7} className="w-full h-63.75 rounded-[19px] z-0">
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    

                        <LocationPicker onLocationSelect={(lat, lng) => {setLat(lat);setLng(lng);}} />
                        {lat !== 0 && lng !== 0 && ( <Marker position={[lat, lng]} icon={defaultIcon} /> )}  
                    </MapContainer> 
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <p className="text-[16px] weight-[500]! leading-[150%]">Location</p>
                        <textarea value={location} onChange={(e) => setLocation(e.target.value)} placeholder="2118 Thornridge Cir. Syracuse, Connecticut 35624" className="file:text-foreground shadow-[0_0_10px_0_rgba(0,0,0,0.2)] py-2 placeholder:leading-[150%] px-4 placeholder:text-dark placeholder:text-[12px] placeholder:font-medium placeholder:font-poppins  selection:text-primary-foreground h-10 w-full min-w-0 border-2 border-transparent bg-transparent text-base transition-[color,box-shadow] outline-none file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed md:text-sm min-h-16 rounded-2xl aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"/>
                    </div>
                                    
                    <Button variant="default" type="submit" className="w-full cursor-pointer">Add place</Button>
                </div>
            </form>
        </div>
    )
}