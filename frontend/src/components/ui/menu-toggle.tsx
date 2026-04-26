import menuIcon from "../../assets/MenuIcon.svg";

interface MenuToggleProps {
  onClick: () => void;
}

const MenuToggle = ({ onClick }: MenuToggleProps) => {
  return (
    <div className="md:hidden block cursor-pointer" onClick={onClick}>
      <img src={menuIcon} alt="Menu" />
    </div>
  );
};

export default MenuToggle;