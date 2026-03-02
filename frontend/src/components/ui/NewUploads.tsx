import React from "react";

interface UploadsData{
    imageUrl: string,
}

const NewUploads: React.FC<UploadsData> = ({ imageUrl }) => {
    return(
        <div className="max-w-105 h-59 relative overflow-hidden rounded-2xl">
            <img src={imageUrl} className="object-cover w-full h-full z-0 absolute"/>
        </div>
    )
}

export default NewUploads; 