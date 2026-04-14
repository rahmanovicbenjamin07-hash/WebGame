import { Button } from "./button";
interface UploadsData{
    imageUrl: string,
    onClick: () => void;
}

export default function NewUploads({ imageUrl, onClick }: UploadsData) {
    return(
        <div className="md:max-w-105 lg:h-59 h-48.5 relative overflow-hidden rounded-2xl cursor-pointer group" onClick={onClick}>
            <img src={imageUrl} className="object-cover w-full h-full z-0 absolute"/>

            <div className="absolute inset-0 bg-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"/>
            
            <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-800">
                <Button variant="outline">Guess</Button>
            </div>
        </div>
    )
}

