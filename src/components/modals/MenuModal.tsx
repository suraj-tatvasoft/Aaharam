import React from 'react';
import { X } from 'lucide-react';
import regularThaliImage from '@/assets/regular-thali.jpg';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuModal = ({ isOpen, onClose }: MenuModalProps) => {
  const menuItems = [
    { name: 'Butter Roti', quantity: 4 },
    { name: 'Sev Tamatar', quantity: 1 },
    { name: 'Mix Kathol', quantity: 1 },
    { name: 'Dal', quantity: 1 },
    { name: 'Rice', quantity: 1 },
  ];

  if (!isOpen) return null;

  return (
    <div style={{ backdropFilter: 'blur(2px)' }} className="fixed inset-0 z-50 flex bg-black/10 p-0 sm:items-center sm:justify-center sm:p-4">
      {/* Desktop modal */}
      <div className="relative mx-auto hidden w-full max-w-md rounded-2xl bg-white p-6 shadow-lg sm:block">
        <button
          onClick={onClose}
          className="absolute left-1/2 z-10 -translate-x-1/2 rounded-full border border-gray-200 p-2 shadow-md hover:bg-gray-100 focus:outline-none"
          style={{ top: '-58px', background: '#F5F5F5' }}
          aria-label="Close"
        >
          <X className="h-6 w-6 text-gray-700" />
        </button>
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">Today's Lunch Menu</h3>
            <p className="mt-1 text-sm text-muted-foreground">11th July 25, Monday</p>
          </div>
        </div>
        <div className="space-y-6">
          {/* Thali Image and Price */}
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-lg">
              <img src={regularThaliImage} alt="Regular Thali" className="h-full w-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Regular Thali</h3>
            </div>
            <span className="text-lg font-bold">₹80</span>
          </div>
          {/* Menu Items */}
          <div className="space-y-3">
            {menuItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-muted-foreground">{item.name}</span>
                <span className="font-medium">{item.quantity}</span>
              </div>
            ))}
          </div>
          {/* Add Button */}
          <button
            className="w-full rounded-xl border border-green-500 bg-white px-4 py-3 text-base font-medium text-green-600 transition-colors hover:bg-green-50"
            onClick={onClose}
          >
            Add item
          </button>
        </div>
      </div>

      {/* Mobile bottom sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 block sm:hidden">
        {/* Close button above modal, centered */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="w-[36px] h-[36px] flex items-center justify-center absolute left-1/2 z-10 -translate-x-1/2 rounded-full border border-gray-200 shadow-md hover:bg-gray-100 focus:outline-none"
            style={{ top: '-52px', background: '#F5F5F5', boxShadow: "0px 0px 20px 0px #A8A8A866" }}
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
        </div>
        <div
          className="bg-white rounded-tl-[30px] rounded-tr-[30px]"
          style={{ boxShadow: "0px -6px 20px 0px #A8A8A866"}}
        >
          {/* Heading and date */}
          <div className="px-4 pb-4 pt-5 flex items-center justify-between">
            <h3 className="text-[16px] leading-[16px] font-medium text-[#212121]">Today's Lunch Menu</h3>
            <span className="text-[14px] leading-[14px] text-[#212121]">11th July 25, Monday</span>
          </div>

          {/* Divider */}
          <div className="h-[4px] w-full bg-[#F7F7F7]" />

          {/* Thali image, name, price */}
          <div className="flex items-center gap-[10px] px-4 py-[10px]">
            <div className="h-[46px] w-[46px] overflow-hidden rounded-[7px]">
              <img src={regularThaliImage} alt="Regular Thali" className="h-full w-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-[16px] font-normal text-[#212121]">Regular Thali</h3>
            </div>
            <span className="text-[14px] font-normal text-[#212121]">₹80</span>
          </div>

          <div className="h-[4px] w-full bg-[#F7F7F7]" />

          {/* Menu Items */}
          <div className="p-4 space-y-4">
            {menuItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-[16px] font-normal text-[#212121] leading-[16px]">{item.name}</span>
                <span className="text-[14px] font-normal text-[#212121] leading-[16px]">{item.quantity}</span>
              </div>
            ))}
          </div>
          {/* Divider */}
          <div className="h-[4px] w-full bg-[#F7F7F7]" />

          {/* Add Button */}
          <div className="px-4 pt-4 pb-8">
            <button
              className="w-full rounded-[8px] border border-[#38963B] bg-white p-4 text-[16px] leading-[16px] font-medium text-[#38963B] transition-colors hover:bg-green-50"
              onClick={onClose}
            >
              Add item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
