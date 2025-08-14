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

type MenuItemConfig = {
  icon: string;
  label: string;
  iconBg: string;
  textColor?: string;
  onClick?: () => void;
};

const MENU_ITEMS: MenuItemConfig[] = [
  { icon: paymentQR, label: 'Payment QR', iconBg: 'bg-[#FFE7D8]' },
  { icon: orderHistory, label: 'Order History', iconBg: 'bg-[#D9F8FF]' },
  { icon: favorites, label: 'My Favorites', iconBg: 'bg-[#D9FFDD]' },
  { icon: lunchSlot, label: 'My Preferred Lunch Time Slot', iconBg: 'bg-[#F2E7FF]' },
  { icon: pantryHours, label: 'Food Pantry Hours', iconBg: 'bg-[#E5F4FF]' },
  { icon: feedback, label: 'Feedback / Suggestions', iconBg: 'bg-[#FAFEDC]' },
  { icon: rules, label: 'Rules & Regulations', iconBg: 'bg-[#FFE3FD]' },
  {
    icon: logout,
    label: 'Logout',
    iconBg: 'bg-[#FFEAE9]',
    textColor: 'text-red-500',
  },
];

export const MenuItem: React.FC<MenuItemConfig> = ({ icon, label, iconBg, textColor, onClick }) => (
  <button
    className={`flex w-full items-center gap-3 rounded-xl bg-white py-1 pl-1 pr-4 ${textColor ?? 'text-[#212121]'} justify-between text-base font-normal`}
    type="button"
    onClick={onClick}
  >
    <div className="flex items-center gap-2.5 text-start">
      <span className={`flex size-[46px] items-center justify-center rounded-xl ${iconBg}`}>
        <img src={icon} alt="" className="size-5" />
      </span>
      {label}
    </div>
    <img src={profileAccordion} alt="Expand" className="h-[10px] w-[5px]" />
  </button>
);

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);

  const handleLogout = () => {
    console.log('User logged out');
    navigate('/login');
  };

  const handleLogoutClick = (label: string) => {
    if (label === 'Logout') {
      setIsLogoutModalOpen(true);
    }
  };

  return (
    <Container>
      <div className="scrollbar-hide flex flex-1 flex-col overflow-hidden bg-[#F7F7F7]">
        <div className="flex-shrink-0 bg-white">
          <div className="flex items-start justify-between p-4">
            <button
              onClick={() => navigate(-1)}
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#E9FFE5]"
              aria-label="Back"
              type="button"
            >
              <img src={profileBack} alt="Back" className="h-4 w-4" />
            </button>
            <div className="flex flex-col items-center gap-[14px]">
              <Avatar className="z-10 h-[50px] w-[50px] border border-[#E5EEE3]">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
              </Avatar>
              <div className="text-lg font-medium text-[#212121]">{user.name}</div>
            </div>
            <button
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#E9FFE5]"
              aria-label="Notifications"
              type="button"
              onClick={() => navigate('/notifications')}
            >
              <div className="relative">
                <img src={notificationIcon} alt="Notifications" className="h-5 w-5" />
                <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-[#E92E27]"></span>
              </div>
            </button>
          </div>

          {/* <div
            className="mx-0 mt-0 flex w-full cursor-pointer flex-col gap-2 bg-[#ADE2A5] p-4 transition-colors"
            onClick={() => navigate('/bulk-pass')}
          >
            <div className="flex flex-row items-center justify-between gap-1">
              <span className="text-base font-normal text-[#212121]">Bulk Pass</span>
              <div className="flex items-center gap-2.5 text-[12px] font-medium text-[#212121]">
                <span>Renew Pass</span> <img src={bulkPassNext} alt="Next" className="size-4" />
              </div>
            </div>
            <div className="flex flex-row items-center justify-between gap-1">
              <span className="text-[12px] leading-[12px] text-[#212121]">{user.passType}</span>
              <span className="text-[12px] leading-[12px] text-[#212121]">Expiring on {user.passExpiry}</span>
            </div>
          </div> */}
        </div>

        <div className="scrollbar-hide mx-auto flex w-full max-w-md flex-1 flex-col gap-3 overflow-y-auto p-4">
          {MENU_ITEMS.map((item, idx) => {
            const navigationMap: Record<string, string> = {
              'Payment QR': '/payment-qr',
              'Order History': '/order-history',
              'My Favorites': '/favorites',
              'Food Pantry Hours': '/food-pantry-hours',
              'Feedback / Suggestions': '/feedback',
              'Rules & Regulations': '/rules-and-regulations',
              'My Preferred Lunch Time Slot': '/update-preference-selection',
            };
            const handleClick = navigationMap[item.label] ? () => navigate(navigationMap[item.label]) : () => handleLogoutClick(item.label);
            return <MenuItem key={idx} {...item} onClick={handleClick} />;
          })}
        </div>
      </div>

      <LogoutModal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} onLogout={handleLogout} />
    </Container>
  );
};

export default Profile;
