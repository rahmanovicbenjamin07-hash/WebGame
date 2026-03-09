import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { InputNoBorder } from "./ui/inputNoBorder"
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

export function GuessingTab() {

    const [lat, setLat] = useState<number>(0);
    const [lng, setLng] = useState<number>(0);

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="max-w-325">
           <div className="flex gap-7.25">
                <div className="min-h-87 w-[50%]">
                    <img src="https://images.pexels.com/photos/34414652/pexels-photo-34414652.jpeg" className="rounded-2xl w-full h-full object-cover"/>
                </div>
                <div className="flex flex-col gap-4 w-[50%] justify-stretch items-stretch">
                    <div>
                        <MapContainer center={[44.0, 17.0]} zoom={7} className="w-full h-63.75 rounded-[19px] z-0">
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />                                                              
                            <LocationPicker onLocationSelect={(lat, lng) => {setLat(lat);setLng(lng);}} />
                            {lat !== 0 && lng !== 0 && ( <Marker position={[lat, lng]} icon={defaultIcon} /> )}  
                        </MapContainer> 
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-7.25 w-full">
                            <div className="flex flex-col gap-2.5 w-53">
                                <label className="font-poppins font-normal text-[16px] leading-[100%]">Error distance</label>
                                <InputNoBorder/>
                            </div>
                            <div className="flex flex-col gap-2.5 w-92.75">
                                <label className="font-poppins font-normal text-[16px] leading-[100%]">Guessed location</label>
                                <InputNoBorder/>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Guess</Button>
                        </DialogFooter>
                    </div>
                </div>
            </div>      
        </DialogContent>
      </form>
    </Dialog>
  )
}
