import React from "react";
import IndicatorBar from "@/components/IndicatorBar";
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
  className = '',
  contentClassName = '',
}) => {
  const navigate = useNavigate();
  return (
    <div className={`min-h-screen max-h-screen bg-[#F7F7F7] flex flex-col items-center w-full pt-0 ${className}`}>
      {/* Top Bar */}
      <div className="flex items-center w-full max-w-md pt-6 pb-6 px-4 bg-[#FFFFFF]">
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
      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto scrollbar-hide flex flex-col items-center w-full ${contentClassName}`}>
        {children}
      </div>
      <div className="mt-2 mb-2">
        <IndicatorBar />
      </div>
    </div>
  );
};

export default PageLayout;
