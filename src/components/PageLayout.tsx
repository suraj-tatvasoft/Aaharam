import React from 'react';
import Container from '@/components/Container';
import IndicatorBar from '@/components/IndicatorBar';
import profileBack from '@/assets/profile-back.svg';
import { useNavigate } from 'react-router-dom';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
  className?: string;
  contentClassName?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, children, showBackButton = true, onBack, className = '', contentClassName = '' }) => {
  const navigate = useNavigate();
  return (
    <Container>
      <div className={`flex w-full flex-1 flex-col items-center overflow-hidden bg-[#F7F7F7] ${className}`}>
        {/* Top Bar */}
        <div className="flex w-full items-center bg-[#FFFFFF] px-4 pb-4 pt-4">
          {showBackButton && (
            <button
              onClick={onBack || (() => navigate(-1))}
              className="mr-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#E9FFE5]"
              aria-label="Back"
              type="button"
            >
              <img src={profileBack} alt="Back" className="h-4 w-4" />
            </button>
          )}
          <span className="text-[18px] font-normal leading-[23px] text-[#212121]">{title}</span>
        </div>
        {/* Main Content */}
        <div className={`scrollbar-hide flex w-full flex-1 flex-col items-center overflow-y-auto ${contentClassName}`}>{children}</div>
        {/* <div className="mt-2 mb-2">
          <IndicatorBar />
        </div> */}
      </div>
    </Container>
  );
};

export default PageLayout;
