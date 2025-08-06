import React from "react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function LogoutModal({ isOpen, onClose, onLogout }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2 backdrop-blur-md">
      <div className="w-[305px] bg-[#F5F5F5] rounded-[16px] shadow-[0_-6px_20px_rgba(168,168,168,0.4)] flex flex-col items-center justify-center p-0 gap-0">
        {/* Header */}
        <div className="w-full bg-white rounded-t-[16px] flex flex-col items-center px-4 pt-5 pb-4">
          <span className="font-outfit font-medium text-[16px] leading-[20px] text-[#212121] text-center">Log out</span>
        </div>
        <div className="h-[2px] bg-gray-200 w-full"></div>
        {/* Message */}
        <div className="w-full bg-white flex flex-col items-center px-4 py-4 font-outfit font-light text-[14px] leading-[20px] text-[#212121] text-center">
          Are you sure you want to log out of Aaharam?
        </div>
        <div className="h-[2px] bg-gray-200 w-full"></div>
        {/* Actions */}
        <div className="w-full bg-white flex flex-row justify-center items-center px-4 py-4 gap-4 rounded-b-[16px]">
          <button
            onClick={onClose}
            className="font-outfit flex-1 font-medium text-[14px] leading-[18px] text-[#212121B3] px-0 py-0 bg-transparent shadow-none"
          >
            No
          </button>
          <button
            onClick={onLogout}
            className="font-outfit flex-1 font-medium text-[14px] leading-[18px] text-[#38963B] px-0 py-0 bg-transparent shadow-none"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
