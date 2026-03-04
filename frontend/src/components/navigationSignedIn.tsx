import Logo from "../assets/Logo.png";
import { Link } from '@tanstack/react-router';
import ProfileImage from "../assets/ProfileImageSmall.png";

export function NavigationSignedIn(){
    return(
        <div className="flex flex-row justify-between pt-11.5 pb-20.75">
            <div>
                <img src={Logo} alt=""/>
            </div>
            <div className="flex gap-12 items-center">
                <Link  to="/home/signed-in" className="text-dark text-[16px] font-normal font-poppins cursor-pointer">Home</Link>
                <button className="text-dark text-[16px] font-normal font-poppins cursor-pointer">Logout</button>
                <Link to="/profile">
                    <img src={ProfileImage} className="cursor-pointer"/>
                </Link>
            </div>
        </div>
    )

}