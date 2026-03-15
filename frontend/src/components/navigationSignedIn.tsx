import { useState,useEffect } from "react";
import Logo from "../assets/Logo.png";
import { Link } from '@tanstack/react-router';
import ProfileImage from "../assets/ProfileImageSmall.png";
import { useNavigate } from '@tanstack/react-router';
import menuIcon from "../assets/MenuIcon.svg";
import { fetchUser } from "@/authentication/auth";
import arrowDark from "../assets/ArrowBlack.svg"
import arrowGradient from "../assets/ArrowGradient.svg"

interface userData {
    email: string,
    firstname:string,
    id:number;
    lastname:string,
} 

export function NavigationSignedIn(){
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [user,setUser] = useState<userData| null>(null);
    const [userAvatar, setUserAvatar] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(()=>{
        fetchUser().then((data) => {
            if (data) {
                setUser(data);
            }
        });
    },[])

    const fetchUserAvatar = async ()=>{
        try {
            const res = await fetch(`http://localhost:3001/user/${user?.id}`)
            if(!res.ok) {
                throw new Error("Failed to get the avatar");
            }

            const data = await res.json();
            setUserAvatar(data[0].image);            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if (!user?.id) return;
        fetchUserAvatar();
    },[user?.id])

    const handleLogOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {

            const response = await fetch("http://localhost:3001/user/signout", {
                method:"POST",
                credentials: "include",
            })

            const result = await response.json();

            if(response.ok){
                console.log(result);
                navigate({ to: '/home/signed-out' }); 
            }
        } catch (err) {
            console.log(err);
        }
    }
    
    return(
        <div className="bg-foreground-primary flex flex-row justify-between items-center pt-11.5 lg:pb-0 py-[31.5px] lg:px-0 px-8.75 md:shadow-none shadow-md z-500 max-w-325 mx-auto">
            <Link to="/home/signed-in">
                <img src={Logo} alt=""/>
            </Link>
            <div className="md:flex gap-12 items-center  hidden">
                <Link  to="/home/signed-in" className="text-dark text-[16px] font-normal font-poppins cursor-pointer">Home</Link>
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
                            <Link  to="/home/signed-in" className="cursor-pointer flex flex-row justify-between items-center">
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