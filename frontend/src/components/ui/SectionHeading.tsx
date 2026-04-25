interface SectionHeadingProps {
    title: string;
    subtitle: string;
    center?: boolean;
}

export function SectionHeading({ title, subtitle, center = false }: SectionHeadingProps) {
    return (
        <div className={`flex flex-col lg:gap-4 gap-2 ${center ? 'items-center' : ''}`}>
            <h4 className={`text-primary lg:leading-13.25 leading-[150%] ${center ? 'text-center lg:text-[35px] text-2xl' : 'font-poppins'}`}>{title}</h4>
            <p className={`text-dark ${center ? 'max-w-146.75 text-center' : ''}`}>{subtitle}</p>
        </div>
    );
}