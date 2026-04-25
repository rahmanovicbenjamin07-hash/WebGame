interface AuthHeadingProps {
    title: string;
    subtitle: string;
}

export function AuthHeading({ title, subtitle }: AuthHeadingProps) {
    return (
        <div className="flex flex-col items-center gap-2">
            <h3 className="lg:leading-18.5 text-dark lg:text-[49px] lg:font-medium text-[35px] leading-13.25 font-normal">{title}</h3>
            <p className="text-foreground-dark text-center">{subtitle}</p>
        </div>
    );
}