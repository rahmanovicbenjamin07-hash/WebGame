interface NavLinksWrapperProps {
  children: React.ReactNode;
  className?: string;
}
 
const NavLinksWrapper = ({ children, className = "" }: NavLinksWrapperProps) => {
  return (
    <div className={`flex flex-col items-stretch gap-6 ${className}`}>
      {children}
    </div>
  );
};
 
export default NavLinksWrapper;