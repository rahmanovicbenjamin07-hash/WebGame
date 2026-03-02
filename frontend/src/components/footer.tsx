import FooterLogo from "../assets/FooterLogo.png"

export function Footer(){
    return (
        <div className="max-w-360 w-full bg-gradient py-4.5 flex items-stretch justify-center rounded-t-[35px] mx-auto">
            <div className="flex justify-between max-w-324.5 w-full items-center">
                <div>
                    <img src={FooterLogo}></img>
                </div>
                <div>
                    <p className="text-foreground-primary">All Rights Reserved | paroot.io</p>
                </div>
            </div>
        </div>
        
    )
}