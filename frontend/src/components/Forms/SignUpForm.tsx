import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react";
import { useNavigate } from '@tanstack/react-router';
import ProfileImagePreview from "../ui/profileImagePreview";
import { useMutation} from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { signUpSchema} from '@/schemas/SignUpSchema';
import { fileToBase64 } from "@/utils/fileToBase";
import { FieldGroup, Field, FieldLabel, FieldError } from "../ui/form-field-components";
import { signUp } from "../../utils/querys/user-query";
import { useIsMobile } from "@/utils/isMobile";
import { useObjectUrl } from "@/hook/useObjectUrl";
import { toast } from "sonner";
import { AuthWrapper } from "../ui/AuthWrapper";
import { AuthRedirectLink } from "../ui/AuthRedirectLink";
import { AuthHeading } from "../ui/AuthHeading";

export function SignUpForm(){
    const isMobile = useIsMobile(1024);
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState<File | null>(null);
    const avatarPreview = useObjectUrl(avatar);
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setAvatar(file);
        }   
    };    
  
    const SignUpMutation = useMutation({
        mutationFn: async (values: { email: string; firstname: string; lastname: string; password: string; confirmpassword: string;}) => {

            const avatarBase64 = await fileToBase64(avatar);

            return signUp({...values,avatar: avatarBase64,avatarName: avatar?.name,avatarType: avatar?.type,password: values.password,confirmpassword: values.confirmpassword,})
    },
        onSuccess: () => {
            navigate({ to: '/home/Dashboard' });
        },
        onError: (error) => {
            toast.error(error.message);
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
    <AuthWrapper>
        <AuthHeading title="Sign up" subtitle="Your name will appear on posts and your public profile."/>
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
            <FieldGroup>
                <form.Field
                    name="email"
                    children={(field) => (
                        <Field>
                            <FieldLabel>Email</FieldLabel>
                            <Input
                                placeholder="example@net.com"
                                type="email"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                            />
                            <FieldError errors={field.state.meta.errors} />
                        </Field>
                    )}
                />
                <div className="flex gap-4">
                    <form.Field
                        name="firstname"
                        children={(field) => (
                            <Field>
                                <FieldLabel>First Name</FieldLabel>
                                <Input
                                    placeholder="Jacob"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                />
                                <FieldError errors={field.state.meta.errors} />
                            </Field>
                        )}
                    />
                    <form.Field
                        name="lastname"
                        children={(field) => (
                            <Field>
                                <FieldLabel>Last Name</FieldLabel>
                                <Input
                                    placeholder="Jones"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                />
                                <FieldError errors={field.state.meta.errors} />
                            </Field>
                        )}
                    />
                </div>
                <form.Field
                    name="password"
                    children={(field) => (
                        <Field>
                            <FieldLabel>Password</FieldLabel>
                            <Input
                                placeholder="••••••••••••••••"
                                type="password"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                            />
                            <FieldError errors={field.state.meta.errors} />
                        </Field>
                    )}
                />
                <form.Field
                    name="confirmpassword"
                    children={(field) => (
                        <Field>
                            <FieldLabel>Confirm Password</FieldLabel>
                            <Input
                                placeholder="••••••••••••••••"
                                type="password"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                            />
                            <FieldError errors={field.state.meta.errors} />
                        </Field>
                    )}
                />
            </FieldGroup>
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
            <AuthRedirectLink message="Already have an account?" linkText="Sign in" to="/AuthPage/signin" />
        </form>
    </AuthWrapper>
);
}