import Logo from "../assets/Logo.png";
import { Link } from '@tanstack/react-router';
import { Button } from "./ui/button";

export function NavigationSignedOut(){
    return(
        <div className="flex flex-row justify-between pt-11.5 pb-20.75 max-w-325 mx-auto md:shadow-none shadow-md">
            <Link to="/home/signed-out">
                <img src={Logo} alt=""/>
            </Link>
            <div className="flex gap-3 items-center">
                <Link  to="/home/signed-in" className="text-dark text-[16px] font-normal font-poppins cursor-pointer">Sign in</Link>
                <p className="text-dark text-[16px] font-normal font-poppins cursor-pointer">Or</p>
                <Link to="/signup">
                    <Button variant="default">Sign up</Button>
                </Link>            
            </div>
        </div>
    )

}