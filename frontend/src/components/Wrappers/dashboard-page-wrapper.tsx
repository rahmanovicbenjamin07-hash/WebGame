interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const PageWrapper = ({ children, className = "" }: PageWrapperProps) => {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
};

export default PageWrapper;