import { Button } from "../components/ui/button";
import CloseGuess  from "../components/ui/CloseGuess";
import { Footer } from "./footer";
import NewUploads from "../components/ui/NewUploads";
import { NavigationSignedIn } from '../components/navigationSignedIn'
import { useState, useEffect } from "react";
import { fetchUser } from "@/authentication/auth";
import { GuessingTab } from "./GuessingTab";

type Guess = {
    id: number;
    missMeters: number;
    imageUrl: string
}

type NewUpload = {
    id: number;
    imageUrl:string;
}

interface userData {
    email: string,
    firstname:string,
    id:number;
    lastname:string,
} 

const newUploads = async ():Promise<NewUpload[]> => {
        const res = await fetch("http://localhost:3001/location/new");

        if(!res.ok){
            throw new Error("Failed to fetch new uploads");
        }

        const data:NewUpload[] = await res.json();
        return data;
    }

export function HeroHomeSignedIn(){
    const [open, setOpen] = useState(false);
    const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
    const [user, setUser] = useState<userData | null>(null);
    const [guesses, setGuesses] = useState<Guess[]>([]);
    const [uploads, setUploads] = useState<NewUpload[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    newUploads().then(setUploads);
    fetchUser().then((data) => {
            if (data) {
                setUser(data);                
            }else {
            setLoading(false); 
        }
        });
    }, []);

    useEffect(() => {
            if (!user?.id) return;
    
            const fetchGuesses = async () => {
                try {
                    const res = await fetch(`http://localhost:3001/guess/bestGuesses/${user.id}`);
                    if(!res.ok) {
                        throw new Error("Failed to get the guesses");
                    }
                    const data: Guess[] = await res.json();
                    setGuesses(data);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };
    
            fetchGuesses();
        }, [user?.id]);
      
    if (loading) return <div>Loading...</div>;    

    const getLocationData = (id: number) => {
    setSelectedLocationId(id);
    setOpen(true);
}

    return(   
        <>
        <GuessingTab open={open} setOpen={setOpen} locationId={selectedLocationId} />

        <div className="max-w-325 mx-auto mb-11.75">
            <NavigationSignedIn/>
            <div className="flex flex-col gap-2">
                <h4 className="text-primary font-poppins leading-13.25">Personal best guesses</h4>
                <p>Your personal best guesses appear here. Go on and try to beat your personal records or set new!</p>
                <div className="flex gap-5 mt-6">
                    {guesses.map((guess) => 
                        <CloseGuess key={guess.id} meters={guess.missMeters} imageUrl={guess.imageUrl} />
                    )}
                </div>
            </div>
            <div className="mt-16 flex flex-col gap-11">
                <div className="flex flex-col gap-2">
                    <h4 className="text-primary font-poppins leading-13.25">New uploads</h4>
                    <p>New uploads from users. Try to guess all the locations by pressing on a picture.</p>
                    <div className="grid grid-cols-3 gap-5 mt-6">
                        {uploads.map((upload) => 
                            <NewUploads imageUrl={upload.imageUrl} key={upload.id} onClick={() => getLocationData(upload.id)} />
                        )}
                    </div>
                </div>
                <Button variant="outline" className="mx-auto">
                    Load more
                </Button>
            </div>           
        </div>
        <Footer></Footer>
        </>
    )

}