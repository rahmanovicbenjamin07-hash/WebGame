import Logo from "../assets/Logo.png";
import { Link } from '@tanstack/react-router';
import { Button } from "./ui/button";

export function NavigationSignedOut(){
    return(
        <div className="flex flex-row justify-between pt-11.5 pb-20.75 max-w-325 mx-auto">
            <div>
                <img src={Logo} alt=""/>
            </div>
            <div className="flex gap-3 items-center">
                <Link  to="/home/signed-in" className="text-dark text-[16px] font-normal font-poppins cursor-pointer">Sign in</Link>
                <p className="text-dark text-[16px] font-normal font-poppins cursor-pointer">Or</p>
                <Button variant="default">Sign up</Button>
            </div>
        </div>
    )

}