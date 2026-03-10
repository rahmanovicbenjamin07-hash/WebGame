import { useEffect, useState } from "react";
import { getDistance } from "geolib";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog"
import { InputNoBorder } from "./ui/inputNoBorder"
import { MapContainer, TileLayer, Marker} from "react-leaflet";
import {LocationPicker} from "../components/ui/MapLocationPicke"
import { defaultIcon } from "./ui/MapDeafultsIcon"; 
import { fetchUser } from "@/authentication/auth";
import { getLocationName } from "@/utils/LocationName";

interface userData {
    email: string,
    firstname:string,
    id:number;
    lastname:string,
}

interface locationData{
    imageUrl:string,
    locationId:number,
    lat:number,
    lng:number;
}

interface GuessingTabProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    locationId: number | null;
}

export function GuessingTab({open,setOpen,locationId}: GuessingTabProps) {
    const [location, setLocation] = useState<locationData | null>(null);
    const [user, setUser] = useState<userData | null>(null);
    const [lat, setLat] = useState<number>(0);
    const [lng, setLng] = useState<number>(0);
    const [missedMeters,setMissedMeter] = useState<string>("");
    const [locationName,setLocationName] = useState<string>("");

    useEffect(()=>{
        fetchUser().then((data) => {
            if (data) {
                setUser(data);
            }
        })
    }, [])

    useEffect(() => {
        if (!locationId) return;

        const fetchLocationData = async () => {

        const res = await fetch(`http://localhost:3001/location/${locationId}`);
        const data = await res.json();

        if (data && data[0]) {
            setLocation({
                imageUrl:data[0].locationImage,
                locationId: data[0].id,
                lat: data[0].lat,
                lng: data[0].lng,
            });
        }
    };
    fetchLocationData();

    }, [locationId])
  

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!location) return;        

        const missMeters = getDistance(
        { latitude: location.lat, longitude: location.lng },  
        { latitude: lat, longitude: lng }                      
        );
        setMissedMeter(JSON.stringify(missMeters));
        try {

        const res = await fetch(`http://localhost:3001/guess/${user?.id}` , { 
            method:"POST",
            headers:{
                    "Content-Type": "application/json",
                },
            body: JSON.stringify({
                locationId:locationId,
                guessedLat:lat,
                guessedLng:lng,
                missMeters:missMeters
                }),
          });
          const result = await res.json();
          if(res.ok){
                console.log(result);   
            }
          }catch (error) {
          console.error(error);
        }

        
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-325 bg-foreground-primary">
            <DialogTitle/>
           <div className="flex gap-7.25">
                <div className="min-h-87 w-[50%]">
                    <img src={location?.imageUrl} className="rounded-2xl w-full h-full object-cover"/>
                </div>
                <div className="flex flex-col gap-4 w-[50%] justify-stretch items-stretch">
                    <div>
                        <MapContainer center={[44.0, 17.0]} zoom={7} className="w-full h-63.75 rounded-[19px] z-0">
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />                                                              
                            <LocationPicker onLocationSelect={async (lat, lng) => {
                                setLat(lat);
                                setLng(lng);
                                const name = await getLocationName(lat, lng);
                                setLocationName(name);
                            }} />
                            {lat !== 0 && lng !== 0 && ( <Marker position={[lat, lng]} icon={defaultIcon} /> )}  
                        </MapContainer> 
                    </div>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="flex gap-7.25 w-full">
                            <div className="flex flex-col gap-2.5 w-53">
                                <label className="font-poppins font-normal text-[16px] leading-[100%]">Error distance</label>
                                <InputNoBorder placeholder={`${missedMeters}m`} readOnly/>
                            </div>
                            <div className="flex flex-col gap-2.5 w-92.75">
                                <label className="font-poppins font-normal text-[16px] leading-[100%]">Guessed location</label>
                                <InputNoBorder value={locationName} readOnly/>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" className="cursor-pointer">Guess</Button>
                        </DialogFooter>
                    </form>
                </div>
            </div>      
        </DialogContent>
    </Dialog>
  )
}
