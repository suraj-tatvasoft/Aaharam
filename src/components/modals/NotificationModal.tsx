'use client';
import React, { useState } from 'react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOk?: (duration: string) => void;
}

export default function NotificationModal({ isOpen, onClose, onOk }: NotificationModalProps) {
  const [selectedOption, setSelectedOption] = useState('1week');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 p-2 backdrop-blur-[2px]">
      <div
        style={{ boxShadow: '0px -6px 20px 0px #A8A8A866' }}
        className="absolute left-1/2 top-1/2 flex w-[305px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0 rounded-[16px] bg-[#F5F5F5] p-0"
      >
        {/* Header */}
        <div className="flex w-full flex-col items-center rounded-t-[16px] bg-white px-4 py-5 text-center">
          <span className="font-outfit w-full text-center text-[16px] font-medium leading-[20px] text-[#212121]">Mute Meal Notification for</span>
        </div>
        <div className="mt-[1px] h-1 w-full bg-[#F5F5F5]" />
        {/* Options */}
        <div className="flex w-full flex-col items-center justify-center gap-0 bg-white">
          {[
            { label: '1 Week', value: '1week' },
            { label: '15 Days', value: '15days' },
            { label: '1 Month', value: '1month' },
          ].map((opt, idx, arr) => (
            <React.Fragment key={opt.value}>
              <div className="flex w-full flex-row items-center justify-center gap-2 py-4">
                <label className="flex w-full cursor-pointer items-center justify-center">
                  <input
                    type="radio"
                    name="muteOption"
                    value={opt.value}
                    checked={selectedOption === opt.value}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="sr-only"
                  />
                  <span
                    className={`mr-2 flex h-[14px] w-[14px] items-center justify-center rounded-full border bg-white ${selectedOption === opt.value ? 'border-[1.5px] border-[#38963B]' : 'border border-[#2121214D]'}`}
                  >
                    {selectedOption === opt.value && <span className="h-2 w-2 rounded-full bg-[#38963B]"></span>}
                  </span>
                  <span className="font-outfit ml-[2px] text-[14px] font-light leading-[18px] text-[#212121]">{opt.label}</span>
                </label>
              </div>
              {idx !== arr.length - 1 && <div className="h-[1px] w-full bg-[#F5F5F5]" />}
            </React.Fragment>
          ))}
        </div>
        {/* Divider */}
        <div className="mt-[1px] h-1 w-full bg-[#F5F5F5]" />
        {/* Actions */}
        <div className="flex w-full flex-row items-center justify-center gap-5 rounded-b-[16px] bg-white">
          <button
            onClick={onClose}
            className="font-outfit min-w-[126px] bg-transparent px-4 py-5 text-[14px] font-medium leading-[14px] text-[#212121B3] shadow-none"
          >
            Cancel
          </button>
          <button
            onClick={() => (onOk ? onOk(selectedOption) : onClose())}
            className="font-outfit min-w-[126px] bg-transparent px-4 py-5 text-[14px] font-medium leading-[14px] text-[#38963B] shadow-none"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
