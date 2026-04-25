interface AuthWrapperProps {
    children: React.ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
    return (
        <div className="lg:max-w-105 max-w-86 flex flex-col items-center gap-4 my-auto relative z-10 lg:bg-transparent bg-foreground-primary lg:px-0 lg:py-0 px-7.5 py-5 lg:rounded-none rounded-4xl">
            {children}
        </div>
    );
}