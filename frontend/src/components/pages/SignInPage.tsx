import { SingInForm } from "../ui/SignInForm";
import BgImage from "../../assets/SignUpPageImage.png";
import Logo from "../../assets/Logo.png";

export function SingInPage(){
    return(
        <div className="flex flex-row max-h-screen gap-22 overflow-hidden items-stretch justify-end w-full">
            <img src={Logo} className="absolute left-[70px] top-[46px]" />
            <SingInForm></SingInForm>
            <div className="min-w-[57%] min-h-full overflow-hidden">
                <img src={BgImage} className="min-w-full h-full object-cover" alt=""/>
            </div>
        </div>
    )
}