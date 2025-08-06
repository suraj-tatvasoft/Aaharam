import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = "" }) => (
  <div className={`h-full flex flex-col max-w-md w-full mx-auto ${className}`}>
    {children}
  </div>
);

export default Container;
