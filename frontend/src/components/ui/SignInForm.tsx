import { Input } from "./input";
import { Button } from "./button";
import { useState } from "react";

interface SignUpFormState  {
  email: string;
  password: string
}

export function SingInForm(){

    const [formData,setFormData] = useState<SignUpFormState>({
        email:"",
        password:""
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

    return(
        <div className="max-w-105 flex flex-col items-center gap-4 my-auto">
            {/* Heading wrapper */}

                <div className="flex flex-col items-center gap-2">
                    <h3 className="leading-18.5 text-dark">Sign in</h3>
                    <p className="text-foreground-dark text-center">Welcome back to Geotagger. We are glad that you are back.</p>
                </div>

             {/* Email input wrapper */}

            <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                    <p className="text-[12px] weight-[500]! leading-none">Email</p>
                    <Input placeholder="example@net.com" type="email" name="email" onChange={handleInputChange}></Input>
                </div>


            {/* Password input wrapper */}

                <div className="flex flex-col gap-2">
                    <p className="text-[12px] weight-[500]! leading-none">Password</p>
                    <Input placeholder="••••••••••••••••" type="password" name="password" onChange={handleInputChange}></Input>
                </div>

            <Button variant="outline" className="w-full" type="submit">Sign In</Button>

                <div className="flex justify-between items-center">
                    <p className="leading-6">Do you want to create an account?</p>
                    <a href="google.com" className="text-primary text-[16px] font-normal">Sign up</a>
                </div>
            </form>

        </div>
    )
}