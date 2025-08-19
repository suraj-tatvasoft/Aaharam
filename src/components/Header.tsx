import { Search } from 'lucide-react';
import headerMenuIcon from '@/assets/header-menu.svg';
import headerAlarmIcon from '@/assets/header-alarm.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useState, useEffect } from 'react';

// Add shake animation styles
const shakeAnimationStyles = `
  @keyframes bellShake {
    0%, 100% { transform: rotate(0deg); }
    10% { transform: rotate(-10deg); }
    20% { transform: rotate(10deg); }
    30% { transform: rotate(-10deg); }
    40% { transform: rotate(10deg); }
    50% { transform: rotate(-5deg); }
    60% { transform: rotate(5deg); }
    70% { transform: rotate(-5deg); }
    80% { transform: rotate(5deg); }
    90% { transform: rotate(0deg); }
  }
  
  .bell-shake {
    animation: bellShake 0.8s ease-in-out infinite;
  }
`;

// Inject styles if not already present
if (typeof document !== 'undefined' && !document.getElementById('bell-shake-styles')) {
  const style = document.createElement('style');
  style.id = 'bell-shake-styles';
  style.textContent = shakeAnimationStyles;
  document.head.appendChild(style);
}

export interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const navigate = useNavigate();
  const [isShaking, setIsShaking] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  // Only trigger shake when there are actual notifications
  useEffect(() => {
    // You can replace this with actual notification logic from your store/API
    // For now, this is a demo that only shakes when notifications exist
    if (notificationCount > 0) {
      const interval = setInterval(() => {
        setIsShaking(true);
        
        // Stop shaking after animation completes
        setTimeout(() => {
          setIsShaking(false);
        }, 200);
      }, 3000); // Shake every 3 seconds when notifications exist

      return () => clearInterval(interval);
    }
  }, [notificationCount]);

  return (
    <>
      <TooltipProvider>
        <header className="bg-white px-4 pb-2 pt-4">
          <div className="flex items-center gap-[6px]">
            {/* User Avatar */}
            <div
              className="h-[42px] w-[42px] flex-shrink-0 cursor-pointer overflow-hidden rounded-full border-[1px] border-[#E5EEE3]"
              onClick={() => navigate('/profile')}
            >
              <img
                src={useSelector((state: RootState) => state.user.avatarUrl)}
                alt={useSelector((state: RootState) => state.user.name) || 'User profile'}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Search Bar - Center */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-black" />
              <Input
                placeholder="Search"
                className="h-[42px] rounded-full font-light text-[14px] border-[transparent] bg-[#F7F7F7] pl-8 text-black placeholder:text-[rgba(33,33,33,0.5)] focus:border-[#38963B] focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none font-light file:font-light focus:placeholder-opacity-0 focus:placeholder-transparent"
              />
            </div>

            {/* Action Buttons - Right Side */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-[42px] w-[42px] border-none rounded-full"
                style={{ backgroundColor: '#E9FFE4' }}
                onClick={onMenuClick}
                aria-label="Open Today's Menu"
              >
                <img src={headerMenuIcon} alt="Menu" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="relative h-[42px] w-[42px] border-none rounded-full"
                style={{ backgroundColor: '#E9FFE4' }}
                onClick={() => navigate('/notifications')}
              >
                <div className={`relative ${isShaking && notificationCount > 0 ? 'bell-shake' : ''}`}>
                  <img src={headerAlarmIcon} alt="Alarm" />
                  {notificationCount > 0 && (
                    <span className="absolute -right-0 -top-0 flex h-2 w-2 items-center justify-center rounded-full bg-destructive text-white" />
                  )}
                </div>
              </Button>
            </div>
          </div>
        </header>
      </TooltipProvider>
    </>
  );
};

export default Header;
