import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from '@tanstack/react-router';
import { signIn } from "@/authentication/auth";
import { useMutation} from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { setStoredUser, useUser } from "@/authentication/userContext";
import { signInSchema } from '@/schemas/SignInSchema';
import type { LoginResponseDto } from '@/types/api';
import { toast } from "sonner";
import { AuthWrapper } from "../ui/AuthWrapper";
import { AuthRedirectLink } from "../ui/AuthRedirectLink";
import { AuthHeading } from "../ui/AuthHeading";
import {  FieldGroup, Field, FieldLabel, FieldError } from "../ui/form-field-components";


export function SignInForm(){
    const navigate = useNavigate();
    const { setUser } = useUser();

    const SignInMutation = useMutation({
        mutationFn: async (values: { email: string; password: string }) => {           
            return signIn({ email: values.email, password: values.password });    
        },
        onSuccess: (response: LoginResponseDto) => {
            setStoredUser(response.data);
            setUser(response.data);
            navigate({ to: '/home/Dashboard' });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    })

    const form = useForm({
        defaultValues: {
            email:'',
            password:'',
        },
        validators: {
            onChange: signInSchema,
        },
        onSubmit: ({value}) => {
            SignInMutation.mutate(value);
        }
    })

    return(
        <AuthWrapper>
        <AuthHeading title="Sign in" subtitle="Welcome back to Geotagger. We are glad that you are back."/>
        <form
            className="flex flex-col gap-4 w-full"
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
            </FieldGroup>
            <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                    <Button
                        variant="outline"
                        className="w-full"
                        type="submit"
                        disabled={!canSubmit || isSubmitting}
                    >
                        {isSubmitting ? "Signing in..." : "Sign In"}
                    </Button>
                )}
            />
            <AuthRedirectLink message="Do you want to create an account?" linkText="Sign up" to="/AuthPage/signup" />
        </form>
    </AuthWrapper>
    )
}
