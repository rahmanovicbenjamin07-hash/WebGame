import { useState } from "react";
import Logo from "../../assets/Logo.png";
import { Link } from '@tanstack/react-router';
import ProfileImage from "../../assets/ProfileImageSmall.png";
import { useNavigate } from '@tanstack/react-router';
import menuIcon from "../../assets/MenuIcon.svg";
import arrowDark from "../../assets/ArrowBlack.svg"
import arrowGradient from "../../assets/ArrowGradient.svg"
import { useMutation} from "@tanstack/react-query";
import { useUser } from "@/authentication/userContext";
import { signOut } from "../../utils/querys/user-query";

export function NavigationSignedIn(){
    const [openMenu, setOpenMenu] = useState<boolean>(false);;
    const navigate = useNavigate();
    const { user, logout } = useUser();

    const logOutMutation = useMutation({
        mutationFn: async () => {     
            return signOut();
        },

        onSuccess: () => {
            logout();
            navigate({ to: '/home' });
        },
        onError: (error) => {
            console.error("Logout failed:", error.message);
        },
    })

    const handleLogOut = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        logOutMutation.mutate();
    };

    const userAvatar = user?.image ?? ProfileImage;

    return(
        <div className="bg-foreground-primary flex flex-row justify-between items-center pt-11.5 lg:pb-0 py-[31.5px] lg:px-0 px-8.75 md:shadow-none shadow-md z-500 max-w-325 mx-auto">
            <Link to="/home/Dashboard">
                <img src={Logo} alt=""/>
            </Link>
            <div className="md:flex gap-12 items-center  hidden">
                <Link  to="/home/Dashboard" className="text-dark text-[16px] font-normal font-poppins cursor-pointer">Home</Link>
                <button className="text-dark text-[16px] font-normal font-poppins cursor-pointer" onClick={handleLogOut}>Logout</button>
                <Link to="/profile">
                    <img src={userAvatar ?? ProfileImage} className="h-10 w-10 overflow-hidden rounded-full"/>
                </Link>
            </div>
            <div className="md:hidden block cursor-pointer" onClick={() => {setOpenMenu(true)}}>
                <img src={menuIcon}/>
            </div>
            {openMenu && (
                <div className="absolute top-0 left-0 right-0 bg-foreground-primary h-75 pt-20 px-8.75 pb-8.75 flex flex-col gap-12.5 shadow-md z-500">
                    <button className="absolute top-10.5 right-10.5 text-primary text-xl cursor-pointer" onClick={() => setOpenMenu(false)}>✕</button>
                    <div className="flex flex-row gap-7.5 items-center">
                        <img src={userAvatar ?? ProfileImage} className="h-12 w-12 overflow-hidden rounded-full"></img>
                        {user && (
                            <h5 className="text-dark text-2xl font-raleway">{user?.firstname} {user?.lastname}</h5>
                            )}
                    </div>
                    <div className="flex flex-col items-stretch gap-6 ">
                            <Link  to="/home/Dashboard" className="cursor-pointer flex flex-row justify-between items-center">
                               <h5 className="font-normal font-raleway">Home</h5>
                               <img src={arrowDark} className="mr-4"/>
                            </Link>
                            <button onClick={handleLogOut} className="flex flex-row justify-between items-center">
                                <h5 className="text-primary font-normal font-raleway" >Logout</h5>
                                <img src={arrowGradient} className="mr-4"/>
                            </button>
                    </div>    
                </div>             
            )}
        </div>
    )

}