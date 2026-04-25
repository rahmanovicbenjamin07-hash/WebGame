import { useState } from "react";
import { getDistance } from "geolib";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { InputNoBorder } from "./ui/inputNoBorder"
import { MapContainer, TileLayer, Marker} from "react-leaflet";
import {LocationPicker} from "../components/ui/MapLocationPicker"
import { defaultIcon } from "./ui/MapDefaultsIcon"; 
import { getLocationName } from "@/utils/LocationName";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchLocation } from "@/utils/querys/locations-query";
import { toast } from "sonner"
import { useUser } from "@/authentication/userContext";
import { LabelBig } from "./ui/labelBig";
import { createGuess } from '@/api/addGuesses';

interface GuessingTabProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    locationId: number | null;
}


export function GuessingTab({open,setOpen,locationId}: GuessingTabProps) {
    const queryClient = useQueryClient();
    const [lat, setLat] = useState<number>(0);
    const [lng, setLng] = useState<number>(0);
    const [missedMeters,setMissedMeters] = useState<string>("");
    const [locationName,setLocationName] = useState<string>("");
    const { user } = useUser();
   

    const locationQuery = useQuery({
        queryKey: ['location', locationId],
        queryFn: () => fetchLocation(locationId!),
    enabled: !!locationId,
    select: (data) => data[0] ? {
        imageUrl: data[0].locationImage,
        locationId: data[0].id,
        lat: data[0].lat,
        lng: data[0].lng,
    } : null,
    });

    const location = locationQuery.data;

    const guessMutation = useMutation({
        mutationFn: async () => {
            const missMeters = getDistance(
            { latitude: location!.lat, longitude: location!.lng },  
            { latitude: lat, longitude: lng }                      
        );

        const result = await createGuess(user?.id, {locationId,guessedLat: lat,guessedLng: lng,missMeters});

        return { result, missMeters };
        },
        onSuccess: ({missMeters}) => {
            queryClient.invalidateQueries({ queryKey: ['bestGuesses'] });
            setMissedMeters(JSON.stringify(missMeters) + "m");
        },
        onError: (error: Error) => {
            toast.error(error.message)
        },
    })

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!location) return;        
        guessMutation.mutate();
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
                                <LabelBig>Error distance</LabelBig>
                                <InputNoBorder placeholder={`${missedMeters}`} readOnly className="lg:w-auto w-full"/>
                            </div>
                            <div className="flex flex-col gap-2.5 lg:min-w-0 lg:w-92.75 min-w-full items-stretch">
                                <LabelBig>Guessed location</LabelBig>
                                <InputNoBorder value={locationName} readOnly className="lg:w-auto w-full"/>
                            </div>
                        </div>
                        <Button type="submit" className="lg:w-34.25 w-full" disabled={guessMutation.isPending}>
                            {guessMutation.isPending ? "Guessing..." : "Guess"}
                        </Button>
                    </form>
                </div>
            </div>      
        </DialogContent>
    </Dialog>
  )
}
