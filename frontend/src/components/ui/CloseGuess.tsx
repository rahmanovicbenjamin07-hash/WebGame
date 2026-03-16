import React from "react";
import GradientOverlay from "../../assets/GradientOverlay.png";

interface GuessData{
    meters: number,
    imageUrl: string,
}

const CloseGuess: React.FC<GuessData> = ({ meters, imageUrl }) => {
    return(
        <div className="2xl:w-105 lg:h-59 h-48.5 relative flex items-center justify-center overflow-hidden">
            <img src={imageUrl} alt={`Guess at ${meters} meters`} className="object-cover w-full h-full rounded-2xl z-0 absolute"/>
            <img src={GradientOverlay} className="object-cover w-full h-full rounded-2xl z-1 top-0 absolute"/>
            {meters && 
            meters<1000 
            ? <p className="text-foreground-primary font-poppins font-bold text-2xl z-10 relative">{meters}m</p> 
            : <p className="text-foreground-primary font-poppins font-bold text-2xl z-10 relative">{(meters / 1000).toFixed(1)}km</p> 
            }
            
        </div>
    )
}

export default CloseGuess; 