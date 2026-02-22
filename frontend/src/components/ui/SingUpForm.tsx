import { Input } from "./input"
import { Button } from "./button"
import ProfileImage from "../../assets/ProfileImageIcon.png";
import { useState } from "react";

interface SignUpFormState  {
  email: string,
  firstname:string,
  lastname:string,
  password: string,
  confirmpassword:string,
}

export function SignUpForm(){

    const [formData,setFormData] = useState<SignUpFormState>({
            email:"",
            firstname:"",
            lastname:"",
            password:"",
            confirmpassword:"",         
        })
    
        const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
            const {name,value} = e.target;
            setFormData(prevData => ({...prevData,[name]:value}))
        }
    
         const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          console.log(formData);
        }catch (error) {
          console.error(error);
        }
      }

    return (
        <div className="max-w-105 flex flex-col items-center gap-4 my-auto">
            {/* Heading wrapper */}

            <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col items-center gap-2">
                    <h3 className="leading-18.5 text-dark">Sign up</h3>
                    <p className="text-foreground-dark text-center">Your name will appear on posts and your public profle.</p>
                </div>
                <img src={ProfileImage} className="h-16 w-16"></img>
            </div>

            {/* Form wrapper */}


            {/* Email input wrapper */}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                    <p className="text-[12px] weight-[500]! leading-none">Email</p>
                    <Input placeholder="example@net.com" type="email" name="email" onChange={handleInputChange}></Input>
                </div>

            {/* Name input wrapper */}

                <div className="flex gap-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-[12px] weight-[500]!">First Name</p>
                        <Input placeholder="Jacob" name="firstname" onChange={handleInputChange}></Input>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-[12px] weight-[500]!">Last Name</p>
                        <Input placeholder="Jones" name="lastname" onChange={handleInputChange}></Input>
                    </div>
                </div>

            {/* Password input wrapper */}

                <div className="flex flex-col gap-2">
                    <p className="text-[12px] weight-[500]! leading-none">Password</p>
                    <Input placeholder="••••••••••••••••" type="password" name="password" onChange={handleInputChange}></Input>
                </div>

            {/* Confirm password input wrapper */}

                <div className="flex flex-col gap-2">
                    <p className="text-[12px] weight-[500]! leading-none">Confirm password</p>
                    <Input placeholder="••••••••••••••••" type="password" name="confirmpassword" onChange={handleInputChange}></Input>
                </div>

            <Button className="w-full" type="submit">Sign Up</Button>

                <div className="flex justify-between items-center">
                    <p className="leading-6">Already have an account?</p>
                    <a href="google.com" className="text-primary text-[16px] font-normal">Sign in</a>
                </div>
            </form>
        </div>
    )
}