import CloseGuess from "./ui/CloseGuess"
import { useState, useEffect } from "react"

interface Guess{
    id:number;
    missMeters: number;
    imageUrl: string;
}

const bestGuess = async ():Promise<Guess[]> =>{
        const res = await fetch("http://localhost:3001/guess/bestGuesses")
      
        if(!res.ok) {
            throw new Error("Failed to get the gueses");
        }

        const data:Guess[] = await res.json();
        return data;
    }

export function ClosesGuesesProfile(){

    const [guesses, setGuesses] = useState<Guess[]>([]);

    useEffect(() => {
        bestGuess().then(setGuesses);
    }, []);

    return (
        <div className="flex flex-col justify-between">
            {guesses.map((guess) => 
                        <CloseGuess key={guess.id} meters={guess.missMeters} imageUrl={guess.imageUrl} />
            )}
        </div>
    )
}