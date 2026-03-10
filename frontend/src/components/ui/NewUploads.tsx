interface UploadsData{
    imageUrl: string,
    onClick: () => void;
}

export default function NewUploads({ imageUrl, onClick }: UploadsData) {
    return(
        <div className="max-w-105 h-59 relative overflow-hidden rounded-2xl cursor-pointer" onClick={onClick}>
            <img src={imageUrl} className="object-cover w-full h-full z-0 absolute"/>
        </div>
    )
}

