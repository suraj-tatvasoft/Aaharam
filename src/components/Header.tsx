import { useState } from "react";
import { Search, QrCode, Menu } from "lucide-react";
import headerMenuIcon from "@/assets/header-menu.svg";
import headerAlarmIcon from "@/assets/header-alarm.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NotificationModal from "@/components/modals/NotificationModal";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

export interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const navigate = useNavigate();
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  return (
    <>
      <TooltipProvider>
        <header className="bg-white p-4 pt-4  shadow-sm">
          <div className="flex items-center gap-3">
            {/* User Avatar */}
            <div className="w-[42px] h-[42px] rounded-full overflow-hidden border-1 border-[#E5EEE3] flex-shrink-0 md:w-12 md:h-12 cursor-pointer" onClick={() => navigate('/profile')}>
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="User profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Search Bar - Center */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search"
                className="pl-10 rounded-full border border-[#E5E7EB] bg-white shadow-sm h-[42px] focus:border-[#E5E7EB] focus:ring-0"
              />
            </div>

            {/* Action Buttons - Right Side */}
            <div className="flex gap-2 items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-[42px] h-[42px] rounded-full" style={{ backgroundColor: '#E9FFE4' }}
                    onClick={onMenuClick}
                    aria-label="Open Today's Menu"
                  >
                    <img src={headerMenuIcon} alt="Menu" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" align="center" className="bg-black text-white">Today's Menu</TooltipContent>
              </Tooltip>
              <Button
                variant="outline"
                size="icon"
                className="w-[42px] h-[42px] rounded-full relative" style={{ backgroundColor: '#E9FFE4' }}
                onClick={() => setIsNotificationModalOpen(true)}
              >
                <img src={headerAlarmIcon} alt="Alarm" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-[8px] text-white flex items-center justify-center">•</span>
              </Button>
            </div>
          </div>
        </header>
      </TooltipProvider>

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
      />
    </>
  );
};

export default Header;