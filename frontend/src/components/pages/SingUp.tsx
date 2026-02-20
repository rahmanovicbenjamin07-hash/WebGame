import { SignUpForm } from "../ui/SingUpForm";
import BgImage from "../../assets/SignUpPageImage.png";

export function SignUpPage(){
    return(
        <div className="flex flex-row max-h-screen gap-22 overflow-hidden items-stretch justify-end w-full">
            <SignUpForm></SignUpForm>
            <div className="min-w-[57%] min-h-full overflow-hidden">
                <img src={BgImage} className="min-w-full h-full object-cover" alt=""/>
            </div>
        </div>
    )  
}