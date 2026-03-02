type MapProps = {
    imageUrl: string,
}

const Map: React.FC<MapProps> = ({imageUrl}) =>{
    return(
        <div className="w-full max-h-50.25 rounded-4xl overflow-clip inline-flex">
            <img src={imageUrl} className="h-full w-full object-cover"></img>
        </div>
    )
}

export default Map