import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import regularThaliImage from '@/assets/regular-thali.jpg';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuModal = ({ isOpen, onClose }: MenuModalProps) => {
  const [isClosing, setIsClosing] = useState(false);
  
  // Lock body scroll when modal is open
  useBodyScrollLock(isOpen);
  
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };
  
  useEffect(() => {
    if (!isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);
  
  const menuItems = [
    { name: 'Butter Roti', quantity: 4 },
    { name: 'Sev Tamatar', quantity: 1 },
    { name: 'Mix Kathol', quantity: 1 },
    { name: 'Dal', quantity: 1 },
    { name: 'Rice', quantity: 1 },
  ];

  const faraliMenuItems = [
    { name: 'Puri', quantity: 6 },
    { name: 'Bateka Bhaji', quantity: 1 },
    { name: 'Farali khichadi', quantity: 1 },
    { name: 'Farali Chevdo', quantity: 1 },
    { name: 'Dahi', quantity: 1 },
  ];

  if (!isOpen) return null;

  return (
    <div
      style={{ backdropFilter: 'blur(5px)' }}
      className="fixed inset-0 z-50 flex items-end bg-black/10 p-0 sm:justify-center sm:px-4 pt-4 pb-0"
    >
      {/* Modal Container */}
      <div className={`relative mx-auto w-full max-w-md rounded-t-[30px] bg-white shadow-lg transition-transform duration-300 ease-out ${
        isClosing ? 'animate-out slide-out-to-bottom' : 'animate-in slide-in-from-bottom'
      }`} style={{ boxShadow: '0px -6px 20px 0px #A8A8A866' }}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className={`absolute left-1/2 z-10 flex h-[36px] w-[36px] -translate-x-1/2 items-center justify-center rounded-full border border-gray-200 shadow-md hover:bg-gray-100 focus:outline-none transition-all duration-300 ease-out hover:scale-105 ${
            isClosing ? 'animate-out slide-out-to-bottom' : 'animate-in slide-in-from-bottom'
          }`}
          style={{ top: '-52px', background: '#fff' }}
          aria-label="Close"
        >
          <X className="h-5 w-5 text-gray-700" />
        </button>
          {/* Heading and date */}
          <div className="flex items-center justify-between px-4 pb-4 pt-5">
            <h3 className="text-[16px] font-medium leading-[16px] text-[#212121]">Today's Lunch Menu</h3>
            <span className="text-[14px] leading-[14px] text-[#212121]">11th July 25, Monday</span>
          </div>

          {/* Divider */}
          <div className="h-[4px] w-full bg-[#F7F7F7]" />

          <div className="flex max-h-[70vh] flex-col gap-[10px] overflow-auto scroll-smooth bg-[#F7F7F7] px-4 pb-4 pt-1 scrollbar-hide">
            {['Regular Thali', 'Meal - Jain', 'Farali Thali'].map((thali) => {
              return (
                <div className="rounded-[10px] bg-white p-4">
                  {/* Thali image, name, price */}
                  <div className="flex items-center gap-[10px]">
                    <div className="h-[46px] w-[46px] overflow-hidden rounded-[7px]">
                      <img src={regularThaliImage} alt="Regular Thali" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[16px] font-normal text-[#212121]">{thali}</h3>
                    </div>
                    <span className="text-[14px] font-normal text-[#212121]">₹80</span>
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-4 py-4">
                    {(thali === 'Farali Thali' ? faraliMenuItems : menuItems).map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-[16px] font-normal leading-[16px] text-[#212121]">{item.name}</span>
                        <span className="text-[14px] font-normal leading-[16px] text-[#212121]">{item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Add Button */}
                  <div>
                    <button
                      className="w-full rounded-[8px] border border-[#38963B] bg-white h-[44px] text-[16px] font-medium leading-[16px] text-[#38963B] transition-colors hover:bg-[#38963B] hover:text-white"
                      onClick={handleClose}
                    >
                      Add item
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
      </div>
    </div>
  );
};

export default MenuModal;
