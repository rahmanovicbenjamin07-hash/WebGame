import React, { useState } from "react";
import ImagePreview from "../ui/imagePreview";
import { Button } from "../ui/button";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { fileToBase64 } from "@/utils/fileToBase";
import { apiFetch } from "@/lib/api";
import FormMessage from "../ui/message-status";
import LocationMap from "../ui/map-location";
import { Field, FieldLabel } from "../ui/form-field-components";

export function NewLocationForm(){
    const queryClient = useQueryClient();
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

    const newLocationMutation = useMutation({
        mutationFn: async (values: { lat: number; lng: number; locationName: string }) => {

            const imageBase64 = await fileToBase64(file);   
                     
            return apiFetch('/location/newLocation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...values,
                    image: imageBase64,
                    imageName: file?.name,
                    imageType: file?.type,
                }),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['LocationsLoading'] });
            setMessage("Location added successfully!");
            setFile(null);
            setLat(0);
            setLng(0);
            setLocationName("");
        },
        onError: (error) => {
            setMessage(error.message);
        },
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!file) {
            setMessage("No image");
            return;
        }

        newLocationMutation.mutate({ lat, lng, locationName });
    };


    return(
    <div className="relative lg:max-w-105 lg:min-h-189.75 my-auto shadow-[0_0_10px_0_rgba(0,0,0,0.2)] px-6 pb-6 rounded-2xl pt-4">
        <div className="-top-16 lg:absolute left-0 right-0 lg:mb-0 mb-6">
            <FormMessage message={message} onClose={() => setMessage(null)} />
        </div> 
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <label htmlFor="file-upload" className="cursor-pointer group">
                <p className="text-[16px] font-medium lg:mb- mb-4 leading-[150%]">Upload image:</p>
                <ImagePreview file={file} />
            </label>             
            <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
            <LocationMap
                lat={lat}
                lng={lng}
                onLocationSelect={(lat, lng, name) => {
                    setLat(lat);
                    setLng(lng);
                    setLocationName(name);
                }}
            /> 
            <Field>
                <FieldLabel>Location</FieldLabel>
                <textarea
                    value={locationName}
                    readOnly
                    placeholder="2118 Thornridge Cir. Syracuse, Connecticut 35624"
                    className="file:text-foreground shadow-[0_0_10px_0_rgba(0,0,0,0.2)] py-2 placeholder:leading-[150%] px-4 placeholder:text-dark placeholder:text-[12px] placeholder:font-medium placeholder:font-poppins selection:text-primary-foreground h-10 w-full min-w-0 border-2 border-transparent bg-transparent text-base transition-[color,box-shadow] outline-none file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed md:text-sm min-h-16 rounded-2xl aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                />
            </Field>
            <Button variant="default" type="submit" className="w-full cursor-pointer" disabled={newLocationMutation.isPending}>
                {newLocationMutation.isPending ? "Adding..." : "Add Location"}
            </Button>
        </form>
    </div>
)
}