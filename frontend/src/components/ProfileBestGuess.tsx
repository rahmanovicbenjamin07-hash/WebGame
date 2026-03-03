import CloseGuess from "./ui/CloseGuess"

interface GuessData{
    meters: number,
    imageUrl: string,
}

const ClosesGuesesProfile: React.FC<GuessData> = ({ meters, imageUrl }) => {
    return (
        <div className="flex flex-col justify-between">
            <CloseGuess meters={meters} imageUrl={imageUrl}></CloseGuess>
            <CloseGuess meters={meters} imageUrl={imageUrl}></CloseGuess>
            <CloseGuess meters={meters} imageUrl={imageUrl}></CloseGuess>
        </div>
    )
}

export default ClosesGuesesProfile;