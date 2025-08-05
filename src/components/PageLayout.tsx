import React from "react";
import profileBack from "@/assets/profile-back.svg";
import { useNavigate } from "react-router-dom";

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
  className?: string;
  contentClassName?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  children,
  showBackButton = true,
  onBack,
  className = "",
  contentClassName = "",
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`min-h-screen max-h-screen bg-[#FAFAFA] flex flex-col items-center w-full pt-0 ${className}`}
    >
      <div className="flex items-center w-full max-w-md pt-6 pb-6 px-4">
        {showBackButton && (
          <button
            onClick={onBack || (() => navigate(-1))}
            className="w-9 h-9 rounded-full bg-[#E9FFE5] flex items-center justify-center mr-2"
            aria-label="Back"
            type="button"
          >
            <img src={profileBack} alt="Back" className="w-6 h-6" />
          </button>
        )}
        <span className="text-base text-[#222] font-medium">{title}</span>
      </div>

      <div
        className={`flex-1 overflow-y-auto scrollbar-hide flex flex-col items-center w-full ${contentClassName}`}
      >
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
