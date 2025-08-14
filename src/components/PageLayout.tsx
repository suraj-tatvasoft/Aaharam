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
      <div className={`flex h-full w-full flex-1 flex-col items-center overflow-hidden bg-gradient-to-r from-[#F7F7F7] to-white to-50% ${className}`}>
        <div className="flex-grow-1 flex w-full items-center gap-2.5 rounded-bl-[22px] bg-[#FFFFFF] px-4 pb-4 pt-4">
          {showBackButton && (
            <button
              onClick={onBack || (() => navigate(-1))}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E9FFE5]"
              aria-label="Back"
              type="button"
            >
              <img src={profileBack} alt="Back" className="size-3.5" />
            </button>
          )}
          <span className="text-[18px] font-normal leading-[23px] text-[#212121]">{title}</span>
        </div>

        <div
          className={`scrollbar-hide flex-grow-1 flex h-full w-full flex-1 flex-col items-center overflow-y-auto rounded-tr-[22px] bg-[#F7F7F7] ${contentClassName}`}
        >
          {children}
        </div>
      </div>
    </Container>
  );
};

export default PageLayout;
