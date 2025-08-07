"use client";
import React, { useState } from "react";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOk?: (duration: string) => void;
}

export default function NotificationModal({ isOpen, onClose, onOk }: NotificationModalProps) {
  const [selectedOption, setSelectedOption] = useState("1week");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2 backdrop-blur-md">
      <div className="absolute left-1/2 top-1/2 w-[305px] -translate-x-1/2 -translate-y-1/2 bg-[#F5F5F5] rounded-[16px] shadow-[0_-6px_20px_rgba(168,168,168,0.4)] flex flex-col items-center justify-center p-0 gap-0">
        {/* Header */}
        <div className="w-full bg-white rounded-t-[16px] flex flex-col items-center px-4 pt-5 pb-2 text-center">
          <span className="font-outfit font-medium text-[16px] leading-[20px] text-[#212121] w-full text-center">Mute Meal Notification for</span>
        </div>
        <div className="w-full h-1 bg-[#F5F5F5] mt-[1px]" />
        {/* Options */}
        <div className="w-full bg-white flex flex-col justify-center items-center gap-0">
          {[
            { label: "1 Week", value: "1week" },
            { label: "15 Days", value: "15days" },
            { label: "1 Month", value: "1month" }
          ].map((opt, idx, arr) => (
            <React.Fragment key={opt.value}>
              <div className="flex flex-row items-center justify-center gap-2 w-full py-4">
                <label className="flex items-center cursor-pointer w-full justify-center">
                  <input
                    type="radio"
                    name="muteOption"
                    value={opt.value}
                    checked={selectedOption === opt.value}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="sr-only"
                  />
                  <span className={`w-[14px] h-[14px] border rounded-full flex items-center justify-center bg-white mr-2 ${selectedOption === opt.value ? 'border-[#38963B] border-[1.5px]' : 'border-[#2121214D] border'}`}>
                    {selectedOption === opt.value && <span className="w-2 h-2 bg-[#38963B] rounded-full"></span>}
                  </span>
                  <span className="font-outfit font-light text-[14px] leading-[18px] text-[#212121] ml-2">{opt.label}</span>
                </label>
              </div>
              {idx !== arr.length - 1 && (
                <div className="w-full h-px border-b border-[#F5F5F5] " />
              )}
            </React.Fragment>
          ))}
        </div>
        {/* Divider */}
        <div className="w-full h-1 bg-[#F5F5F5] mt-[1px]" />
        {/* Actions */}
        <div className="w-full bg-white flex flex-row justify-center items-center px-4 py-4 rounded-b-[16px] gap-20">
          <button
            onClick={onClose}
            className="font-outfit font-medium text-[14px] leading-[18px] text-[#212121B3] px-0 py-0 bg-transparent shadow-none"
          >
            Cancel
          </button>
          <button
            onClick={() => onOk ? onOk(selectedOption) : onClose()}
            className="font-outfit font-medium text-[14px] leading-[18px] text-[#38963B] px-0 py-0 bg-transparent shadow-none"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}