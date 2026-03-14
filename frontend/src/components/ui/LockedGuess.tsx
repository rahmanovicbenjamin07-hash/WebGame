import React from "react";
import GradientOverlay from "../../assets/GradientOverlay.png";
import LockIcon from "../../assets/Lock.svg";

interface LockGuessData{
    imageUrl: string,
}

const LockGuess: React.FC<LockGuessData> = ({  imageUrl }) => {
    return(
        <div className="lg:w-105 lg:h-59 h-47.5 min-w-86 w-full relative flex items-center justify-center overflow-hidden">
            <img src={imageUrl} className="object-cover w-full h-full rounded-2xl z-0 absolute"/>
            <img src={GradientOverlay} className="object-cover w-full h-full rounded-2xl z-1 top-0 absolute"/>
            <img src={LockIcon} className="absolute z-20"/>
        </div>
    )
}

export default LockGuess; 