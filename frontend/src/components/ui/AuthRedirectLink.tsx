import { Link } from '@tanstack/react-router';

interface AuthRedirectLinkProps {
    message: string;
    linkText: string;
    to: string;
}

export function AuthRedirectLink({ message, linkText, to }: AuthRedirectLinkProps) {
    return (
        <div className="flex justify-between items-center">
            <p className="lg:leading-[150%]">{message}</p>
            <Link to={to} className="text-primary text-[16px] font-normal text-nowrap">{linkText}</Link>
        </div>
    );
}