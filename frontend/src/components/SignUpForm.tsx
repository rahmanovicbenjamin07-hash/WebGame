import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { useState } from "react";
import { useNavigate } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import ProfileImagePreview from "./ui/profileImagePreview";
import { useMutation} from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { signUpSchema} from '@/schemas/SignUpSchema';
import { FieldError } from "./ui/FieldError";
import { fileToBase64 } from "@/utils/fileToBase";
import { Label } from "./ui/label";
import { signUp } from "@/api/signUp";
import { useIsMobile } from "@/utils/isMobile";

export function SignUpForm(){
    const isMobile = useIsMobile(1024);
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setAvatar(file);
        setAvatarPreview(URL.createObjectURL(file));
        }   
    };    
  
    const SignUpMutation = useMutation({
        mutationFn: async (values: { email: string; firstname: string; lastname: string; password: string; confirmpassword: string;}) => {

            const avatarBase64 = await fileToBase64(avatar);

            return signUp({...values,avatar: avatarBase64,avatarName: avatar?.name,avatarType: avatar?.type,password: values.password,confirmpassword: values.confirmpassword,})
    },
        onSuccess: () => {
            navigate({ to: '/home/signed-in' });
        },
        onError: (error) => {
            alert(error.message);
        },    
    })

    const form = useForm({
        defaultValues: {
            email:'',
            firstname:'',
            lastname:'',
            password:'',
            confirmpassword:'',
        },
        validators: {
            onChange: signUpSchema,
        },
        onSubmit: ({value}) => {
            SignUpMutation.mutate(value);
        }
    })

    return (
        <div className="lg:max-w-105 max-w-86 flex flex-col items-center gap-4 my-auto relative z-10 lg:bg-transparent bg-foreground-primary lg:px-0 lg:py-0 px-7.5 py-5 lg:rounded-none rounded-4xl">
            {/* Heading wrapper */}

            <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col items-center gap-2">
                    <h3 className="lg:leading-18.5 text-dark lg:text-[49px] lg:font-medium text-[35px] leading-13.25 font-normal">Sign up</h3>
                    <p className="text-foreground-dark text-center">Your name will appear on posts and your public profle.</p>
                </div>          
            </div>

            {/* Form wrapper */}

            {/* Email input wrapper */}
            <label htmlFor="file-upload" className="cursor-pointer">
                    <ProfileImagePreview avatarPreview={avatarPreview} isMobile={isMobile} />
                </label>
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden h-16 w-16"
                />

            
            <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
            >
                {/* Email */}
                <form.Field
                    name="email"
                    children={(field) => (
                        <div className="flex flex-col gap-2">
                            <Label>Email</Label>
                            <Input
                                placeholder="example@net.com"
                                type="email"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                            />
                            <FieldError errors={field.state.meta.errors} />
                        </div>
                    )}
                />

                {/* First name + Last name */}
                <div className="flex gap-4">
                    <form.Field
                        name="firstname"
                        children={(field) => (
                            <div className="flex flex-col gap-2">
                                <Label>First Name</Label>
                                <Input
                                    placeholder="Jacob"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                />
                                <FieldError errors={field.state.meta.errors} />
                            </div>
                        )}
                    />
                    <form.Field
                        name="lastname"
                        children={(field) => (
                            <div className="flex flex-col gap-2">
                                <Label>Last Name</Label>
                                <Input
                                    placeholder="Jones"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                />
                                <FieldError errors={field.state.meta.errors} />
                            </div>
                        )}
                    />
                </div>

                {/* Password */}
                <form.Field
                    name="password"
                    children={(field) => (
                        <div className="flex flex-col gap-2">
                            <Label>Password</Label>
                            <Input
                                placeholder="••••••••••••••••"
                                type="password"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                            />
                                <FieldError errors={field.state.meta.errors} />
                        </div>
                    )}
                />

                {/* Confirm password */}
                <form.Field
                    name="confirmpassword"
                    children={(field) => (
                        <div className="flex flex-col gap-2">
                            <Label>Confirm Password</Label>
                            <Input
                                placeholder="••••••••••••••••"
                                type="password"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                            />
                            <FieldError errors={field.state.meta.errors} />
                        </div>
                    )}
                />

                {/* Submit */}
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                        <Button
                            className="w-full"
                            type="submit"
                            disabled={!canSubmit || isSubmitting}
                        >
                            {isSubmitting ? "Signing up..." : "Sign Up"}
                        </Button>
                    )}
                />

                <div className="flex justify-between items-center">
                    <p className="leading-6">Already have an account?</p>
                    <Link to="/signin" className="text-primary text-[16px] font-normal">Sign in</Link>
                </div>
            </form>
        </div>
    )
}