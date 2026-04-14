import FooterLogo from "../assets/FooterLogo.png"
import LogoIcon from "../assets/LogoIconSmall.svg"

export function Footer(){
    return (
        <div className="max-w-360 w-full bg-gradient lg:py-4.5 py-0 2xl:px-0 px-10.5 flex items-stretch justify-center lg:rounded-t-[35px] rounded-t-4xl mx-auto lg:h-auto h-16.25">
            <div className="flex justify-between max-w-324.5 w-full items-center">
                <div>
                    <img src={FooterLogo} className="hidden md:block"></img>
                    <img src={LogoIcon} className="block md:hidden"></img>
                </div>
                <div>
                    <p className="text-foreground-primary lg:text-[16px] text-[12px] leading-[100%] text-right lg:font-poppins font-raleway no-underline">All Rights Reserved | paroot.io</p>
                </div>
            </div>
        </div>
        
    )
}