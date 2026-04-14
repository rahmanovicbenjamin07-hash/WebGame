import { Button } from "../components/ui/button";
import CloseGuess  from "../components/ui/CloseGuess";
import { Footer } from "./footer";
import NewUploads from "../components/ui/NewUploads";
import { NavigationSignedIn } from '../components/navigationSignedIn'
import { useState, useEffect } from "react";
import { fetchUser } from "@/authentication/auth";
import { GuessingTab } from "./GuessingTab";
import { useIsMobile } from "@/utils/isMobile";

interface Guess {
    id: number;
    missMeters: number;
    imageUrl: string
}

interface NewUpload {
    id: number;
    imageUrl: string;
}

interface userData {
    email: string,
    firstname:string,
    id:number;
    lastname:string,
} 

export function HeroHomeSignedIn(){
    const [open, setOpen] = useState(false);
    const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
    const [user, setUser] = useState<userData | null>(null);
    const [guesses, setGuesses] = useState<Guess[]>([]);
    const [uploads, setUploads] = useState<NewUpload[]>([]);
    const [loading, setLoading] = useState(true);
    const isMobile = useIsMobile();
    const limit = isMobile ? 3 : 9;

    const loadmoreUploads = async ()=> {
        const res = await fetch(`http://localhost:3001/location/new?offset=${uploads.length}&limit=${limit}`)
        const data: NewUpload[] = await res.json();
        setUploads(prev=>[...prev,...data]);
    }

    useEffect(() => {
    const load = async () => {
        const res = await fetch(`http://localhost:3001/location/new?limit=${limit}`);
        if (!res.ok) throw new Error("Failed to fetch new uploads");
        const data: NewUpload[] = await res.json();
        setUploads(data);
    };
    load();

    fetchUser().then((data) => {
        if (data) {
            setUser(data);
        } else {
            setLoading(false);
        }
    });
        }, []);

    const fetchGuesses = async () => {
        if (!user) return;
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

    useEffect(() => {
            if (!user?.id) return;
            fetchGuesses();
        }, [user?.id]);
      
    if (loading) return <div>Loading...</div>;    

    const getLocationData = (id: number) => {
    setSelectedLocationId(id);
    setOpen(true);
}

    return(   
        <>
        <GuessingTab open={open} setOpen={setOpen} locationId={selectedLocationId} onGuessSumbit={fetchGuesses}/>
        <NavigationSignedIn/>
        <div className="relative lg:pb-26.5 pb-29">
        <div className="max-w-325 lg:mx-auto  mx-8.75 lg:mt-20.75 mt-0">
            <div className="flex flex-col lg:gap-2 gap-4 lg:mt-0 mt-14">
                <h4 className="text-primary font-poppins lg:leading-13.25 leading-[150%]">Personal best guesses</h4>
                <p>Your personal best guesses appear here. Go on and try to beat your personal records or set new!</p>
                <div className="flex lg:gap-5 lg:mt-6 gap-4.25 mt-4 lg:overflow-visible overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory touch-pan-x">
                    {guesses.map((guess) => 
                        <div key={guess.id} className="snap-start shrink-0 w-72 h-48.5 lg:flex-1 lg:w-auto lg:h-59">
                        <CloseGuess meters={guess.missMeters} imageUrl={guess.imageUrl} />
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-16 flex flex-col lg:gap-11 gap-12.75">
                <div className="flex flex-col gap-2">
                    <h4 className="text-primary font-poppins leading-13.25">New uploads</h4>
                    <p>New uploads from users. Try to guess all the locations by pressing on a picture.</p>
                    <div className="grid grid-cols-1 gap-6 mt-14 sm:grid-cols-2  lg:grid-cols-3 lg:gap-5 lg:mt-6">
                        {uploads.map((upload) => 
                            <NewUploads imageUrl={upload.imageUrl} key={upload.id} onClick={() => getLocationData(upload.id)} />
                        )}
                    </div>
                </div>

                <Button variant="outline" className="mx-auto" onClick={loadmoreUploads}>
                    Load more
                </Button>
            </div>           
        </div>
            <div className="absolute left-0 right-0 bottom-0">
                    <Footer/>
                </div>               
           </div>             
        </>
    )
}