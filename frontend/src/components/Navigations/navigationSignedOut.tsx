import { useState } from "react";
import { Link } from '@tanstack/react-router';
import { Button } from "../ui/button";
import arrowDark from "../../assets/ArrowBlack.svg"
import NavLinkItem from "../ui/NavLinkItem";
import NavLinksWrapper from "../Wrappers/nav-links-wrapper";
import NavLogo from "../ui/Nav-logo";
import MenuToggle from "../ui/menu-toggle";
import MobileMenu from "../Wrappers/mobile-menu-wrapper";

export function NavigationSignedOut(){

    const [openMenu, setOpenMenu] = useState<boolean>(false);

    return(
        <div className="bg-foreground-primary flex flex-row justify-between lg:pt-11.5 pt-[31.5px] lg:mb-20.75 max-w-325 lg:pb-0 py-[31.5px] lg:px-0 px-8.75 mx-auto md:shadow-none shadow-md z-50 relative">
            <NavLogo />
            <div className="flex gap-3 items-center">
                <Link  to="/home/Dashboard" className="lg:flex hidden text-dark text-[16px] font-normal font-poppins cursor-pointer">Sign in</Link>
                <p className="lg:flex hidden text-dark text-[16px] font-normal font-poppins cursor-pointer">Or</p>
                <Link to="/AuthPage/signup">
                    <Button variant="default" className="lg:flex hidden">Sign up</Button>
                </Link>  
                <MenuToggle onClick={() => setOpenMenu(true)} />
            {openMenu && (
                <MobileMenu onClose={() => setOpenMenu(false)} className="pt-23.75">
                    <NavLinksWrapper>
                        <NavLinkItem to="/home/Dashboard" label="Home" icon={arrowDark} />
                    </NavLinksWrapper>
                    <NavLinksWrapper>
                        <Link to="/AuthPage/signup"><Button variant="default" className="w-full">Sign up</Button></Link>
                        <Link to="/AuthPage/signin"><Button variant="outline" className="w-full">Sign in</Button></Link>
                    </NavLinksWrapper>
                </MobileMenu>
            )}          
            </div>
        </div>
    )

}