import { Link } from "@tanstack/react-router";
 
type NavLinkItemBaseProps = {
  label: string;
  icon?: string;
  iconAlt?: string;
  labelClassName?: string;
  className?: string;
};
 
type NavLinkItemAsLink = NavLinkItemBaseProps & {
  as?: "link";
  to: string;
  onClick?: never;
};
 
type NavLinkItemAsButton = NavLinkItemBaseProps & {
  as: "button";
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  to?: never;
};
 
type NavLinkItemProps = NavLinkItemAsLink | NavLinkItemAsButton;
 
const NavLinkItem = ({
  label,
  icon,
  iconAlt = "navigate",
  labelClassName = "font-normal font-raleway",
  className = "",
  ...rest
}: NavLinkItemProps) => {
  const content = (
    <>
      <h5 className={labelClassName}>{label}</h5>
      {icon && <img src={icon} alt={iconAlt} className="mr-4" />}
    </>
  );
 
  const baseClass = `cursor-pointer flex flex-row justify-between items-center ${className}`;
 
  if (rest.as === "button") {
    return (
      <button onClick={rest.onClick} className={baseClass}>
        {content}
      </button>
    );
  }
 
  return (
    <Link to={rest.to} className={baseClass}>
      {content}
    </Link>
  );
};
 
export default NavLinkItem;