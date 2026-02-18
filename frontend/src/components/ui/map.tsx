type MapProps = {
    imageUrl: string,
}

export function Map({imageUrl}: MapProps){
    return(
        <div className="w-full max-h-50.25 rounded-4xl overflow-clip inline-flex">
            <img src={imageUrl} className="h-full w-full object-cover"></img>
        </div>
    )
}