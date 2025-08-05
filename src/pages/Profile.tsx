import React from "react";
import Container from "@/components/Container";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import notificationIcon from "@/assets/header-alarm.svg";
import bulkPassNext from "@/assets/bulk-pass-next.svg";
import profileBack from "@/assets/profile-back.svg";
import paymentQR from "@/assets/wallet.svg";
import orderHistory from "@/assets/Clipboard.svg";
import favorites from "@/assets/Heart.svg";
import lunchSlot from "@/assets/clock-plus.svg";
import pantryHours from "@/assets/clock.svg";
import feedback from "@/assets/feed-back.svg";
import rules from "@/assets/rule.svg";
import logout from "@/assets/logout.svg";
import profileAccordion from "@/assets/profile-accordion.svg";
import IndicatorBar from "@/components/IndicatorBar";

// --- Types ---
type User = {
    name: string;
    avatar: string;
    passType: string;
    passExpiry: string;
};

type MenuItemConfig = {
    icon: string;
    label: string;
    color: string;
    iconBg: string;
    textColor?: string;
    onClick?: () => void;
};

// --- Constants ---
const USER: User = {
    name: "Dhiren Devganiya",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    passType: "Regular Thali - Without Butter Milk",
    passExpiry: "31st July",
};

const MENU_ITEMS: MenuItemConfig[] = [
    { icon: paymentQR, label: "Payment QR", color: "bg-[#FFF7F2]", iconBg: "bg-[#FFE6D6]" },
    { icon: orderHistory, label: "Order History", color: "bg-[#F2F8FF]", iconBg: "bg-[#D6E9FF]" },
    { icon: favorites, label: "My Favorites", color: "bg-[#F2FFF6]", iconBg: "bg-[#D6FFE8]" },
    { icon: lunchSlot, label: "My Preferred Lunch Time Slot", color: "bg-[#F7F2FF]", iconBg: "bg-[#EAD6FF]" },
    { icon: pantryHours, label: "Food Pantry Hours", color: "bg-[#F2F8FF]", iconBg: "bg-[#D6E9FF]" },
    { icon: feedback, label: "Feedback / Suggestions", color: "bg-[#FFFFF2]", iconBg: "bg-[#FFFCD6]" },
    { icon: rules, label: "Rules & Regulations", color: "bg-[#F7F2FF]", iconBg: "bg-[#EAD6FF]" },
    { icon: logout, label: "Logout", color: "bg-[#FFF2F2]", iconBg: "bg-[#FFD6D6]", textColor: "text-[#F04438]" },
];

// --- Components ---
export const MenuItem: React.FC<MenuItemConfig> = ({ icon, label, color, iconBg, textColor, onClick }) => (
    <button
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${color} ${textColor ?? "text-black"} text-base font-medium justify-between shadow-sm`}
        type="button"
        onClick={onClick}
    >
        <span className="flex items-center gap-3">
            <span className={`w-10 h-10 flex items-center justify-center rounded-xl ${iconBg}`}>
                <img src={icon} alt="" className="w-6 h-6" />
            </span>
            {label}
        </span>
        <img src={profileAccordion} alt="Expand" className="w-4 h-4 opacity-60" />
    </button>
);

// --- Main Profile Page ---
const Profile: React.FC = () => {
    const navigate = useNavigate();
    const user = USER;

    return (
        <Container>
            <div className="min-h-screen max-h-screen bg-[#fff] flex flex-col scrollbar-hide">
                <div className="flex-shrink-0">
                    {/* Header */}
                    <div className="flex flex-col items-center relative">
                        <div className="absolute left-4 top-8">
                            <button
                                onClick={() => navigate(-1)}
                                className="w-10 h-10 rounded-full bg-[#E9FFE5] flex items-center justify-center"
                                aria-label="Back"
                                type="button"
                            >
                                <img src={profileBack} alt="Back" className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="absolute right-4 top-8">
                            <button
                                className="w-10 h-10 rounded-full bg-[#E9FFE5] flex items-center justify-center"
                                aria-label="Notifications"
                                type="button"
                                onClick={() => navigate('/notifications')}
                            >
                                <img src={notificationIcon} alt="Notifications" className="w-6 h-6" />
                            </button>
                        </div>
                        <Avatar className="w-20 h-20 border-4 border-white bg-white shadow-md mt-10 z-10">
                            <AvatarImage src={user.avatar} alt={user.name} />
                        </Avatar>
                        <div className="pt-3 pb-2 text-lg font-bold text-[#222]">{user.name}</div>
                    </div>

                    {/* Pass Info */}
                    <div
                        className="bg-[#A7E6B9] mx-0 mt-0 px-6 py-2 flex flex-row items-center justify-between w-full cursor-pointer hover:bg-[#bdf2c9] transition-colors"
                        onClick={() => navigate('/bulk-pass')}
                    >
                        <div className="flex flex-col items-start gap-1">
                            <span className="font-semibold text-xl text-[#222]">Bulk Pass</span>
                            <span className="text-xs text-[#222]">{user.passType}</span>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <button className="text-[#222] text-xs font-semibold flex items-center gap-2" type="button">
                                Renew Pass <img src={bulkPassNext} alt="Next" className="w-4 h-4" />
                            </button>
                            <span className="text-xs text-[#222]">Expiring on {user.passExpiry}</span>
                        </div>
                    </div>
                </div>
                {/* Menu List - sticky/scrollable */}
                <div className="flex-1 overflow-y-auto flex flex-col gap-3 px-4 py-6 max-w-md w-full mx-auto scrollbar-hide">
                    {MENU_ITEMS.map((item, idx) => {
                        // Map menu labels to navigation paths
                        const navigationMap: Record<string, string> = {
                            "Payment QR": "/payment-qr",
                            "My Favorites": "/favorites",
                            "My Preferred Lunch Time Slot": "/update-preference-selection",
                            "Food Pantry Hours": "/food-pantry-hours",
                            // Add more mappings here as needed
                        };
                        const handleClick = navigationMap[item.label]
                            ? () => navigate(navigationMap[item.label])
                            : item.onClick;
                        return (
                            <MenuItem
                                key={item.label}
                                {...item}
                                onClick={handleClick}
                            />
                        );
                    })}
                </div>
                <div className="mt-2 mb-2">
                    <IndicatorBar />
                </div>
            </div>
        </Container>
    );
};

export default Profile;
