import CloseGuess from "./ui/CloseGuess"
import { useState, useEffect } from "react"
import { fetchUser } from "@/authentication/auth";


interface Guess{
    id:number;
    missMeters: number;
    imageUrl: string;
}

interface userData {
    email: string,
    firstname:string,
    id:number;
    lastname:string,
} 

export function ClosesGuesesProfile(){

    const [user, setUser] = useState<userData | null>(null);
    const [guesses, setGuesses] = useState<Guess[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUser().then((data) => {
            if (data) {
                setUser(data);                
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

    return (
        <div className="flex flex-col justify-between">
            {guesses.map((guess) => 
                <CloseGuess key={guess.id} meters={guess.missMeters} imageUrl={guess.imageUrl} />
            )}
        </div>
    )
}

