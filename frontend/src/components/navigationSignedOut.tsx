import { useState } from "react";
import Logo from "../assets/Logo.png";
import { Link } from '@tanstack/react-router';
import { Button } from "./ui/button";
import menuIcon from "../assets/MenuIcon.svg";
import arrowDark from "../assets/ArrowBlack.svg"

export function NavigationSignedOut(){

    const [openMenu, setOpenMenu] = useState<boolean>(false);

    return(
        <div className="bg-foreground-primary flex flex-row justify-between lg:pt-11.5 pt-[31.5px] lg:mb-20.75 max-w-325 lg:pb-0 py-[31.5px] lg:px-0 px-8.75 mx-auto md:shadow-none shadow-md z-50 relative">
            <Link to="/home/signed-out">
                <img src={Logo} alt=""/>
            </Link>
            <div className="flex gap-3 items-center">
                <Link  to="/home/signed-in" className="lg:flex hidden text-dark text-[16px] font-normal font-poppins cursor-pointer">Sign in</Link>
                <p className="lg:flex hidden text-dark text-[16px] font-normal font-poppins cursor-pointer">Or</p>
                <Link to="/signup">
                    <Button variant="default" className="lg:flex hidden">Sign up</Button>
                </Link>  
                <div className="md:hidden block cursor-pointer" onClick={() => {setOpenMenu(true)}}>
                    <img src={menuIcon}/>
                </div>

            {openMenu && (
                <div className="absolute top-0 left-0 right-0 bg-foreground-primary h-75 pt-23.75 px-8.75 pb-8.75 flex flex-col gap-12.5 shadow-md">
                    <button className="absolute top-10.5 right-10.5 text-primary text-xl cursor-pointer" onClick={() => setOpenMenu(false)}>✕</button>
                    <div className="flex flex-col items-stretch gap-6">
                            <Link  to="/home/signed-out" className="cursor-pointer flex flex-row justify-between items-center">
                               <h5 className="font-normal font-raleway">Home</h5>
                               <img src={arrowDark} className="mr-4"/>
                            </Link>                          
                    </div>  
                    <div className="flex flex-col gap-6 items-stretch">
                        <Link to="/signup"><Button variant="default" className="w-full">Sign up</Button></Link>   
                        <Link  to="/signin"><Button variant="outline" className="w-full">Sign in</Button></Link>  
                    </div>  
                </div>             
            )}          
            </div>
        </div>
    )

}