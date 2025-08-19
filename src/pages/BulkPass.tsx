import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backArrow from '@/assets/backArrow.svg';
import ActivationModal from '@/components/modals/ActivationModal';
import Container from '@/components/Container';
import { BulkPassMenu } from '@/data';
import notificationIcon from '@/assets/header-alarm.svg';

const BulkPass: React.FC = () => {
  const navigate = useNavigate();
  const [isActivationOpen, setActivationOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <Container>
      <div className="relative flex flex-1 flex-col gap-4 bg-[linear-gradient(180deg,#DAFFD9_0%,#FFFFFF_132.38%)] p-4">
        <div className="flex items-center justify-between">
          <button
            className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#EEFFED]"
            onClick={() => navigate(-1)}
            aria-label="Back"
          >
            <img src={backArrow} alt="Back" className="size-3.5" />
          </button>

          <div className="flex items-center gap-1.5">
            <div className="h-[42px] w-[42px] flex-shrink-0 overflow-hidden rounded-full border border-[#E5EEE3]">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="User profile"
                className="h-full w-full object-cover"
                onClick={() => navigate('/profile')}
              />
            </div>
            <button
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#EEFFED]"
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
        </div>

        <div className="mb-4 flex flex-col items-center gap-4 text-center text-[#212121]">
          <span className="text-[12px] font-medium leading-[8px]">Exclusive discount on</span>
          <span className="text-[36px] font-medium leading-[25px]">BULK PASS</span>
          <span className="mt-1 text-[12px] font-medium leading-[8px]">Grab ₹220 Discount on Lunch Meal</span>
        </div>

        <span className="text-[20px] font-medium leading-[14px] text-[#212121]">Recommended for you</span>

        <div className="flex flex-1 flex-col gap-4">
          {BulkPassMenu.map((item, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <div key={idx} className="flex rounded-[16px] bg-white p-1 shadow-[0px_0px_20px_0px_#F25D460D]">
                <img src={item.image} alt={item.title} className="h-[112px] w-[112px] rounded-[12px] object-cover" />
                <div className="flex flex-1 flex-col justify-between px-[10px] py-1.5">
                  <div className="flex flex-col gap-1">
                    <div className="text-[16px] font-normal leading-[16px] text-[#212121]">
                      {item.title} <span className="block text-[12px] font-normal">{item.subtitle}</span>
                    </div>
                    <span className="text-[11px] font-light leading-[16px] text-[#797979]">{item.description}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="flex items-end gap-1">
                      <span className="text-[14px] font-normal leading-[10px] text-[#212121]">₹{item.price.discounted}/</span>
                      <span className="text-[12px] font-light leading-[8px] text-[#797979] line-through">₹{item.price.original}</span>
                    </div>
                    <button
                      className={`flex items-center justify-center rounded-[8px] border border-[#38963B] px-3 py-2.5 text-[14px] font-medium leading-[10px] ${isSelected ? 'bg-[#38963B] text-white' : 'bg-[#ffffff] text-[#38963B]'}`}
                      onClick={() => setSelectedIdx(isSelected ? null : idx)}
                    >
                      {isSelected ? 'Added' : 'Add'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          className="h-[43px] w-full rounded-[8px] border border-[#38963B] bg-[#38963B] text-base font-medium text-white"
          onClick={() => {
            if (selectedIdx !== null) setActivationOpen(true);
          }}
          disabled={selectedIdx === null}
        >
          {selectedIdx === null ? 'Buy Monthly Pass' : `Buy Monthly Pass - ₹${BulkPassMenu[selectedIdx].price.discounted}`}
        </button>
      </div>

      <ActivationModal isOpen={isActivationOpen} onClose={() => setActivationOpen(false)} />
    </Container>
  );
};

export default BulkPass;
