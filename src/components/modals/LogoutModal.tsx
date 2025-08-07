import React from 'react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function LogoutModal({ isOpen, onClose, onLogout }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 backdrop-blur-md">
      <div className="flex w-[305px] flex-col items-center justify-center gap-0 rounded-[16px] bg-[#F5F5F5] p-0 shadow-[0_-6px_20px_rgba(168,168,168,0.4)]">
        {/* Header */}
        <div className="flex w-full flex-col items-center rounded-t-[16px] bg-white px-4 pb-4 pt-5">
          <span className="font-outfit text-center text-[16px] font-medium leading-[20px] text-[#212121]">Log out</span>
        </div>
        <div className="h-[2px] w-full bg-gray-200"></div>
        {/* Message */}
        <div className="font-outfit flex w-full flex-col items-center bg-white px-4 py-4 text-center text-[14px] font-light leading-[20px] text-[#212121]">
          Are you sure you want to log out of Aaharam?
        </div>
        <div className="h-[2px] w-full bg-gray-200"></div>
        {/* Actions */}
        <div className="flex w-full flex-row items-center justify-center gap-4 rounded-b-[16px] bg-white px-4 py-4">
          <button
            onClick={onClose}
            className="font-outfit flex-1 bg-transparent px-0 py-0 text-[14px] font-medium leading-[18px] text-[#212121B3] shadow-none"
          >
            No
          </button>
          <button
            onClick={onLogout}
            className="font-outfit flex-1 bg-transparent px-0 py-0 text-[14px] font-medium leading-[18px] text-[#38963B] shadow-none"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
