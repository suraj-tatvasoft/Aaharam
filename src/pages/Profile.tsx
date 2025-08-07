import React from 'react';
import Container from '@/components/Container';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import notificationIcon from '@/assets/header-alarm.svg';
import bulkPassNext from '@/assets/bulk-pass-next.svg';
import profileBack from '@/assets/profile-back.svg';
import paymentQR from '@/assets/wallet.svg';
import orderHistory from '@/assets/Clipboard.svg';
import favorites from '@/assets/Heart.svg';
import lunchSlot from '@/assets/clock-plus.svg';
import pantryHours from '@/assets/clock.svg';
import feedback from '@/assets/feed-back.svg';
import rules from '@/assets/rule.svg';
import logout from '@/assets/logout.svg';
import profileAccordion from '@/assets/profile-accordion.svg';
import LogoutModal from '@/components/modals/LogoutModal';
import NotificationModal from '@/components/modals/NotificationModal';

type MenuItemConfig = {
  icon: string;
  label: string;
  color: string;
  iconBg: string;
  textColor?: string;
  onClick?: () => void;
};

// --- Constants ---
const MENU_ITEMS: MenuItemConfig[] = [
  { icon: paymentQR, label: 'Payment QR', color: 'bg-[#FFF7F2]', iconBg: 'bg-[#FFE6D6]' },
  { icon: orderHistory, label: 'Order History', color: 'bg-[#F2F8FF]', iconBg: 'bg-[#D6E9FF]' },
  { icon: favorites, label: 'My Favorites', color: 'bg-[#F2FFF6]', iconBg: 'bg-[#D6FFE8]' },
  { icon: lunchSlot, label: 'My Preferred Lunch Time Slot', color: 'bg-[#F7F2FF]', iconBg: 'bg-[#EAD6FF]' },
  { icon: pantryHours, label: 'Food Pantry Hours', color: 'bg-[#F2F8FF]', iconBg: 'bg-[#D6E9FF]' },
  { icon: feedback, label: 'Feedback / Suggestions', color: 'bg-[#FFFFF2]', iconBg: 'bg-[#FFFCD6]' },
  { icon: rules, label: 'Rules & Regulations', color: 'bg-[#F7F2FF]', iconBg: 'bg-[#EAD6FF]' },
  {
    icon: logout,
    label: 'Logout',
    color: 'bg-[#FFF2F2]',
    iconBg: 'bg-[#FFD6D6]',
    textColor: 'text-red-500'
  }
];

// --- Components ---
export const MenuItem: React.FC<MenuItemConfig> = ({ icon, label, color, iconBg, textColor, onClick }) => (
  <button
    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 ${color} ${textColor ?? 'text-[#212121]'} justify-between text-base font-normal shadow-sm`}
    type="button"
    onClick={onClick}
  >
    <span className="flex items-center gap-3">
      <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
        <img src={icon} alt="" className="h-6 w-6" />
      </span>
      {label}
    </span>
    <img src={profileAccordion} alt="Expand" className="h-4 w-4 opacity-60" />
  </button>
);

// --- Main Profile Page ---
const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = React.useState(false);

  const handleLogout = () => {
    // Add your logout logic here
    console.log('User logged out');
    // For example: Clear auth tokens, redirect to login, etc.
    navigate('/login');
  };

  const handleLogoutClick = (label: string) => {
    if (label === 'Logout') {
      setIsLogoutModalOpen(true);
    }
  };

  return (
    <Container>
      <div className="scrollbar-hide flex flex-1 flex-col overflow-hidden bg-[#fff]">
        <div className="flex-shrink-0">
          {/* Header */}
          <div className="relative flex flex-col items-center">
            <div className="absolute left-4 top-4">
              <button
                onClick={() => navigate(-1)}
                className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#E9FFE5]"
                aria-label="Back"
                type="button"
              >
                <img src={profileBack} alt="Back" className="h-4 w-4" />
              </button>
            </div>
            <div className="absolute right-4 top-4">
              <button
                className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#E9FFE5]"
                aria-label="Notifications"
                type="button"
                onClick={() => setIsNotificationModalOpen(true)}
              >
                <img src={notificationIcon} alt="Notifications" className="h-5 w-5" />
              </button>
            </div>
            <Avatar className="border-1 z-10 mt-6 h-[50px] w-[50px] border-[#E5E7EB]">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
            </Avatar>
            <div className="pb-2 pt-3 text-lg font-medium text-[#212121]">{user.name}</div>
          </div>

          {/* Pass Info */}
          <div
            className="mx-0 mt-0 flex w-full cursor-pointer flex-row items-center justify-between bg-[#A7E6B9] px-6 py-2 transition-colors"
            onClick={() => navigate('/bulk-pass')}
          >
            <div className="flex flex-col items-start gap-1">
              <span className="text-base font-normal text-[#212121]">Bulk Pass</span>
              <span className="text-[12px] text-[#212121]">{user.passType}</span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <button className="flex items-center gap-2 text-[12px] font-normal text-[#212121]" type="button">
                Renew Pass <img src={bulkPassNext} alt="Next" className="h-4 w-4" />
              </button>
              <span className="text-[12px] text-[#212121]">Expiring on {user.passExpiry}</span>
            </div>
          </div>
        </div>
        {/* Menu List - sticky/scrollable */}
        <div className="scrollbar-hide mx-auto flex w-full max-w-md flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
          {MENU_ITEMS.map((item, idx) => {
            // Map menu labels to navigation paths
            const navigationMap: Record<string, string> = {
              'Payment QR': '/payment-qr',
              'Order History': '/order-history',
              'My Favorites': '/favorites',
              'Food Pantry Hours': '/food-pantry-hours',
              'Feedback / Suggestions': '/feedback',
              'Rules & Regulations': '/rules-and-regulations',
              'My Preferred Lunch Time Slot': '/update-preference-selection'
              // Add more mappings here as needed
            };
            const handleClick = navigationMap[item.label] ? () => navigate(navigationMap[item.label]) : () => handleLogoutClick(item.label);
            return <MenuItem key={item.label} {...item} onClick={handleClick} />;
          })}
        </div>
        {/* <div className="mt-2 mb-2">
                    <IndicatorBar />
                </div> */}
      </div>

      <LogoutModal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} onLogout={handleLogout} />
      {/* Notification Modal */}
      <NotificationModal isOpen={isNotificationModalOpen} onClose={() => setIsNotificationModalOpen(false)} />
    </Container>
  );
};

export default Profile;
