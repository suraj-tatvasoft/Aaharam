import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => (
  <div className={`mx-auto flex h-full w-full max-w-md flex-col ${className}`}>{children}</div>
);

export default Container;
