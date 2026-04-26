import { useState } from "react";
import { Link } from '@tanstack/react-router';
import ProfileImage from "../../assets/ProfileImageSmall.png";
import { useNavigate } from '@tanstack/react-router';
import arrowDark from "../../assets/ArrowBlack.svg"
import arrowGradient from "../../assets/ArrowGradient.svg"
import { useMutation} from "@tanstack/react-query";
import { useUser } from "@/authentication/userContext";
import { signOut } from "../../utils/querys/user-query";
import NavLinkItem from "../ui/NavLinkItem";
import NavLinksWrapper from "../Wrappers/nav-links-wrapper";
import NavLogo from "../ui/Nav-logo";
import MenuToggle from "../ui/menu-toggle";
import MobileMenu from "../Wrappers/mobile-menu-wrapper";

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
            <NavLogo to="/home/Dashboard" />
            <div className="md:flex gap-12 items-center  hidden">
                <Link  to="/home/Dashboard" className="text-dark text-[16px] font-normal font-poppins cursor-pointer">Home</Link>
                <NavLinkItem
                    as="button"
                    onClick={handleLogOut}
                    label="Logout"
                    labelClassName="text-dark text-[16px] font-normal font-poppins cursor-pointer"
                />
                <Link to="/profile">
                    <img src={userAvatar ?? ProfileImage} className="h-10 w-10 overflow-hidden rounded-full"/>
                </Link>
            </div>
            <MenuToggle onClick={() => setOpenMenu(true)} />
            {openMenu && (
                <MobileMenu onClose={() => setOpenMenu(false)}>
                    <div className="flex flex-row gap-7.5 items-center">
                        <img src={userAvatar ?? ProfileImage} className="h-12 w-12 overflow-hidden rounded-full" />
                        {user && <h5 className="text-dark text-2xl font-raleway">{user?.firstname} {user?.lastname}</h5>}
                    </div>
                    <NavLinksWrapper>
                        <NavLinkItem to="/home/Dashboard" label="Home" icon={arrowDark} />
                        <NavLinkItem as="button" onClick={handleLogOut} label="Logout" icon={arrowGradient} labelClassName="text-primary font-normal font-raleway" />
                    </NavLinksWrapper>
                </MobileMenu>
            )}
        </div>
    )

}