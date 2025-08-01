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
    <div style={{ backdropFilter: "blur(8px)" }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4">
        <h3 className="text-lg font-semibold mb-6 text-center text-gray-800">
          Mute Meal Notification for
        </h3>
        {/* Divider below title */}
        <div className="border-t border-gray-200 mb-6" />

        <div className="space-y-6 mb-8">
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="radio"
                name="muteOption"
                value="1week"
                checked={selectedOption === "1week"}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedOption === "1week"
                ? "border-green-500 bg-green-500"
                : "border-gray-300"
                }`}>
                {selectedOption === "1week" && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </div>
            <span className="ml-4 text-gray-700 text-base">1 Week</span>
          </label>

          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="radio"
                name="muteOption"
                value="15days"
                checked={selectedOption === "15days"}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedOption === "15days"
                ? "border-green-500 bg-green-500"
                : "border-gray-300"
                }`}>
                {selectedOption === "15days" && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </div>
            <span className="ml-4 text-gray-700 text-base">15 Days</span>
          </label>

          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="radio"
                name="muteOption"
                value="1month"
                checked={selectedOption === "1month"}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedOption === "1month"
                ? "border-green-500 bg-green-500"
                : "border-gray-300"
                }`}>
                {selectedOption === "1month" && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </div>
            <span className="ml-4 text-gray-700 text-base">1 Month</span>
          </label>
        </div>

        {/* Divider above buttons */}
        <div className="border-t border-gray-200 mb-4" />
        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 text-gray-600 rounded-xl font-medium text-base hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onOk ? onOk(selectedOption) : onClose()}
            className="flex-1 py-3 px-4 bg-green-600 text-white rounded-xl font-medium text-base hover:bg-green-700 transition-colors"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}