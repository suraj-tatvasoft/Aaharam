import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userImg from "@/assets/main-logo.svg"; // Placeholder, replace with actual user image if available
import thaliImg from "@/assets/regular-thali.jpg";
import alarmIcon from "@/assets/header-alarm.svg";
import backArrow from "@/assets/backArrow.svg";
import ActivationModal from "@/components/modals/ActivationModal";

const thalis = [
  {
    title: "Regular Thali",
    desc: "4 Butter Roti, 2 Sabji, Gujarati Dal, Bhat, Salad, Mango Juice",
    price: 1540,
    original: 1760,
    img: thaliImg,
  },
  {
    title: "Regular Thali - with buttermilk",
    desc: "4 Butter Roti, 2 Sabji, Gujarati Dal, Bhat, Salad, Mango Juice, Buttermilk",
    price: 1760,
    original: 1980,
    img: thaliImg,
  },
];

const BulkPass: React.FC = () => {
  const navigate = useNavigate();
  const [isActivationOpen, setActivationOpen] = useState(false);
  const handleBack = () => {
    navigate('/');
  };
  return (
    <>
      <div
        className="min-h-screen px-4 pt-4 pb-20 flex flex-col"
        style={{ background: 'linear-gradient(180deg, #DAFFD9 0%, #FFFFFF 132.38%)' }}
      >
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4">
        <button
          className="w-[42px] h-[42px] rounded-full shadow-md flex items-center justify-center"
          style={{ backgroundColor: '#EEFFED' }}
          onClick={handleBack}
          aria-label="Back"
        >
          <img src={backArrow} alt="Back" className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          {/* User Avatar (same as Header) */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              alt="User profile"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Notification Icon Button (same as Header) */}
          <button
            className="w-[42px] h-[42px] rounded-full relative flex items-center justify-center"
            style={{ backgroundColor: '#EEFFED' }}
            aria-label="Notifications"
            onClick={() => { /* Add notification modal logic if needed */ }}
          >
            <img src={alarmIcon} alt="Alarm" className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-[8px] text-white flex items-center justify-center">•</span>
          </button>
        </div>
      </div>

      {/* Title Section */}
      <div className="flex flex-col items-center text-center mb-6">
        <span className="text-sm font-medium text-gray-700">Exclusive discount on</span>
        <span className="text-3xl font-bold text-black mt-1">BULK PASS</span>
        <span className="text-sm text-gray-600 mt-1">Grab ₹220 Discount on Lunch Meal</span>
      </div>

      {/* Recommended Section */}
      <div className="mb-2">
        <span className="font-medium text-base text-black">Recommended for you</span>
      </div>

      {/* Thali Cards */}
      <div className="flex flex-col">
        {thalis.map((thali, idx) => (
          <div
            key={idx}
            className="rounded-xl bg-white p-3 mb-4 shadow-sm flex"
          >
            <img
              src={thali.img}
              alt={thali.title}
              className="w-[112px] h-[112px] rounded-md object-cover mr-3"
            />
            <div className="flex flex-col flex-1 justify-between">
              <div>
                <div className="font-medium text-black text-base mb-1">{thali.title}</div>
                <div className="text-xs text-gray-500 mb-2">{thali.desc}</div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <span className="text-black font-semibold text-base">₹{thali.price}</span>
                  <span className="line-through text-gray-500 ml-2 text-sm">₹{thali.original}</span>
                </div>
                <button className="w-16 h-8 text-sm border border-green-500 text-green-500 rounded-md flex items-center justify-center hover:bg-green-50 transition">Add</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA Button */}
      <button
        className="fixed bottom-4 left-4 right-4 bg-green-600 text-white text-center py-3 rounded-lg shadow-lg font-bold text-base z-50"
        style={{ minWidth: 220 }}
        onClick={() => setActivationOpen(true)}
      >
        Buy Monthly Pass - ₹1540
      </button>
    </div>
    <ActivationModal isOpen={isActivationOpen} onClose={() => setActivationOpen(false)} />
  </>);
};

export default BulkPass;
