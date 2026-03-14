import Logo from "../assets/Logo.png";
import { Link } from '@tanstack/react-router';
import ProfileImage from "../assets/ProfileImageSmall.png";
import { useNavigate } from '@tanstack/react-router';

export function NavigationSignedIn(){

    const navigate = useNavigate();

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

        }

    }
    
    return(
        <div className="flex flex-row justify-between pt-11.5 pb-20.75 md:shadow-none shadow-md">
            <Link to="/home/signed-in">
                <img src={Logo} alt=""/>
            </Link>
            <div className="flex gap-12 items-center">
                <Link  to="/home/signed-in" className="text-dark text-[16px] font-normal font-poppins cursor-pointer">Home</Link>
                <button className="text-dark text-[16px] font-normal font-poppins cursor-pointer" onClick={handleLogOut}>Logout</button>
                <Link to="/profile">
                    <img src={ProfileImage}/>
                </Link>
            </div>
        </div>
    )

}