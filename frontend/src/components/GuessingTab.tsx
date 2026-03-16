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
    onGuessSumbit: () => void;
}

export function GuessingTab({open,setOpen,locationId,onGuessSumbit}: GuessingTabProps) {
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
        setMissedMeter(JSON.stringify(missMeters)+"m");
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
                onGuessSumbit(); 
            }
          }catch (error) {
          console.error(error);
        }

        
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="lg:max-w-325 lg:max-h-99 w-[91.30%] bg-foreground-primary">
            <DialogTitle/>
           <div className="flex gap-7.25 lg:flex-row flex-col">
                <div className="lg:max-h-87 max-h-46.25 lg:w-[50%]">
                    <img src={location?.imageUrl} className="rounded-2xl w-full h-full object-cover"/>
                </div>
                <div className="flex flex-col lg:gap-4 gap-7.25 lg:w-[50%] justify-stretch items-stretch">
                    <div>
                        <MapContainer center={[44.6131, 17.9867]} zoomControl={false} zoom={7} className="w-full lg:h-50.25 h-46.25 rounded-[19px] z-0">
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
                        <div className="flex lg:gap-7.25 gap-2.5 w-full lg:flex-row flex-col">
                            <div className="flex flex-col gap-2.5 lg:w-53">
                                <label className="font-poppins font-normal text-[16px] leading-[100%]">Error distance</label>
                                <InputNoBorder placeholder={`${missedMeters}`} readOnly className="lg:w-auto w-full"/>
                            </div>
                            <div className="flex flex-col gap-2.5 lg:min-w-0 lg:w-92.75 min-w-full items-stretch">
                                <label className="font-poppins font-normal text-[16px] leading-[100%]">Guessed location</label>
                                <InputNoBorder value={locationName} readOnly className="lg:w-auto w-full"/>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" className="lg:w-34.25 w-full">Guess</Button>
                        </DialogFooter>
                    </form>
                </div>
            </div>      
        </DialogContent>
    </Dialog>
  )
}
