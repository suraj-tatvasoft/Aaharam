import { Search } from 'lucide-react';
import headerMenuIcon from '@/assets/header-menu.svg';
import headerAlarmIcon from '@/assets/header-alarm.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <>
      <TooltipProvider>
        <header className="bg-white p-4">
          <div className="flex items-center gap-[6px]">
            {/* User Avatar */}
            <div
              className="border-1 h-[42px] w-[42px] flex-shrink-0 cursor-pointer overflow-hidden rounded-full border-[#E5EEE3]"
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
                className="text-black placeholder:text-black h-[42px] rounded-full border border-[#E5EEE3] bg-white pl-10 focus:border-[#E5EEE3] focus:ring-0 focus-visible:ring-offset-0"
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
                onClick={() => navigate('/notifications')}
              >
                <div className="relative">
                  <img src={headerAlarmIcon} alt="Alarm" />
                  <span className="absolute -right-0 -top-0 flex h-2 w-2 items-center justify-center rounded-full bg-destructive text-white" />
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
