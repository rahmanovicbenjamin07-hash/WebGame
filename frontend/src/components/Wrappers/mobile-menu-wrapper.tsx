interface MobileMenuProps {
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const MobileMenu = ({ onClose, children, className = "pt-20" }: MobileMenuProps) => {
  return (
    <div className={`absolute top-0 left-0 right-0 bg-foreground-primary h-75 px-8.75 pb-8.75 flex flex-col gap-12.5 shadow-md z-500 ${className}`}>
      <button className="absolute top-10.5 right-10.5 text-primary text-xl cursor-pointer" onClick={onClose}>✕</button>
      {children}
    </div>
  );
};

export default MobileMenu;