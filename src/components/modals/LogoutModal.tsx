"use client";
import React from "react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function LogoutModal({ isOpen, onClose, onLogout }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div style={{ backdropFilter: "blur(8px)" }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4">
        <h3 className="text-lg font-semibold mb-6 text-center text-gray-800">
          Logout
        </h3>
        <div className="border-t border-gray-200 mb-6" />
        
        <p className="text-sm text-gray-600 text-center mb-8">
          Are you sure you want to logout?
        </p>
        
        <div className="border-t border-gray-200 mb-4" />
        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 text-gray-600 rounded-xl font-medium text-base hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onLogout}
            className="flex-1 py-3 px-4 bg-red-600 text-white rounded-xl font-medium text-base hover:bg-green-700 transition-colors"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
