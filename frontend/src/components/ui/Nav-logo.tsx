import { Link } from "@tanstack/react-router";
import Logo from "../../assets/Logo.png";

interface NavLogoProps {
  to?: string;
}

const NavLogo = ({ to = "/home" }: NavLogoProps) => {
  return (
    <Link to={to}>
      <img src={Logo} alt="Logo" />
    </Link>
  );
};

export default NavLogo;