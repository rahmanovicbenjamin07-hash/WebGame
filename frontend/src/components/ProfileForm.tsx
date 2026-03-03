import { Button } from "../components/ui/button"
import ProfileImage from "../assets/ProfileImageLarge.png";
import { useState } from "react";
import { useNavigate } from '@tanstack/react-router';
import { InputNoBorder } from "./ui/inputNoBorder";

interface ProfileFormState  {
  email: string,
  firstname:string,
  lastname:string,
  password: string,
  confirmpassword:string,
}

export function ProfileForm(){
    const navigate = useNavigate();

    const [formData,setFormData] = useState<ProfileFormState>({
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

        if (formData.password !== formData.confirmpassword) {
        alert("Lozinke se ne podudaraju!");
        return;
    }            

        try {

            const response = await fetch("http://localhost:3001/user/signup", {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                password: formData.password,
                }),
            })

            const result = await response.json();

            if(response.ok){
                console.log(result);
                navigate({ to: '/home/signed-out' }); 
            }
          
        }catch (error) {
          console.error(error);
        }
      }

    return (
        <div className="max-w-105 min-h-189.75 flex flex-col items-center justify-end gap-6 my-auto shadow-[0_0_10px_0_rgba(0,0,0,0.2)] px-8 pb-6 rounded-2xl">
            {/* Heading wrapper */}

            <div>              
                <img src={ProfileImage} className="h-20 w-20"></img>
            </div>

            <h4>Jacob Jones</h4>

            {/* Form wrapper */}

            <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                    <p className="text-[16px] weight-[500]! leading-[150%]">Name</p>
                    <InputNoBorder placeholder="Jacob" type="email" name="name" onChange={handleInputChange}/>
                </div>

            {/* Name input wrapper */}

                <div className="flex flex-col gap-2">
                    <p className="text-[16px] weight-[500]! leading-[150%]">Last Name</p>
                    <InputNoBorder placeholder="Jacob" type="email" name="name" onChange={handleInputChange}/>
                </div>


            {/* Password input wrapper */}

                <div className="flex flex-col gap-2">
                    <p className="text-[16px] weight-[500]! leading-[150%]">Email</p>
                    <InputNoBorder placeholder="Jacob" type="email" name="name" onChange={handleInputChange}/>
                </div>

            {/* Confirm password input wrapper */}

                <div className="flex flex-col gap-2">
                    <p className="text-[16px] weight-[500]! leading-[150%]">Password</p>
                    <InputNoBorder placeholder="Jacob" type="email" name="name" onChange={handleInputChange}/>
                </div>

            <Button className="w-full mt-23.5" type="submit">Save Profile</Button>
            </form>
        </div>
    )
}