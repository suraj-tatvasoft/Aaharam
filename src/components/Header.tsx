import { useState } from 'react';
import { Search, QrCode, Menu } from 'lucide-react';
import headerMenuIcon from '@/assets/header-menu.svg';
import headerAlarmIcon from '@/assets/header-alarm.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NotificationModal from '@/components/modals/NotificationModal';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { useNavigate } from 'react-router-dom';

export interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const navigate = useNavigate();
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  return (
    <>
      <TooltipProvider>
        <header className="bg-white p-4 pt-4 shadow-sm">
          <div className="flex items-center gap-3">
            {/* User Avatar */}
            <div
              className="border-1 h-[42px] w-[42px] flex-shrink-0 cursor-pointer overflow-hidden rounded-full border-[#E5EEE3] md:h-12 md:w-12"
              onClick={() => navigate('/profile')}
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="User profile"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Search Bar - Center */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
              <Input
                placeholder="Search"
                className="h-[42px] rounded-full border border-[#E5E7EB] bg-white pl-10 shadow-sm focus:border-[#E5E7EB] focus:ring-0"
              />
            </div>

            {/* Action Buttons - Right Side */}
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-[42px] w-[42px] rounded-full"
                    style={{ backgroundColor: '#E9FFE4' }}
                    onClick={onMenuClick}
                    aria-label="Open Today's Menu"
                  >
                    <img src={headerMenuIcon} alt="Menu" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" align="center" className="bg-black text-white">
                  Today's Menu
                </TooltipContent>
              </Tooltip>
              <Button
                variant="outline"
                size="icon"
                className="relative h-[42px] w-[42px] rounded-full"
                style={{ backgroundColor: '#E9FFE4' }}
                onClick={() => setIsNotificationModalOpen(true)}
              >
                <img src={headerAlarmIcon} alt="Alarm" />
                <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-destructive text-[8px] text-white">
                  •
                </span>
              </Button>
            </div>
          </div>
        </header>
      </TooltipProvider>

      <NotificationModal isOpen={isNotificationModalOpen} onClose={() => setIsNotificationModalOpen(false)} />
    </>
  );
};

export default Header;
