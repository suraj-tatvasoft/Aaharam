import React, { useState } from 'react';
import CongratulationsModal from './CongratulationsModal';

interface ActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ActivationModal: React.FC<ActivationModalProps> = ({ isOpen, onClose }) => {
  const [isCongratsOpen, setCongratsOpen] = useState(false);
  const handleCongratsOpen = () => setCongratsOpen(true);
  const handleCongratsClose = () => setCongratsOpen(false);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2121211A] p-2 backdrop-blur-[4px]">
        <div className="flex w-[305px] flex-col items-center justify-center gap-0 rounded-[16px] bg-[#F5F5F5] p-0 shadow-[0px_-6px_20px_0px_#A8A8A866]">
          <div className="flex w-full flex-col items-center rounded-t-[16px] bg-white px-4 py-5">
            <span className="text-center text-[16px] font-medium leading-[11px] text-[#212121]">Activation</span>
          </div>

          <div className="h-[4px] w-full bg-[#F5F5F5]"></div>

          <div className="flex w-full flex-col items-center bg-white px-4 py-4 text-center text-[14px] font-light leading-[20px] text-[#212121]">
            Your request has been received.
            <br />
            Make payment directly on Billing Desk
            <br />
            and get it activated.
          </div>

          <div className="h-[4px] w-full bg-[#F5F5F5]"></div>

          <div className="flex w-full flex-col items-center justify-center gap-4 rounded-b-[16px] bg-white">
            <button
              onClick={handleCongratsOpen}
              className="h-[50px] w-full bg-transparent p-0 text-[14px] font-medium leading-[10px] text-[#38963B] shadow-none"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <CongratulationsModal isOpen={isCongratsOpen} onClose={handleCongratsClose} />
    </>
  );
};

export default ActivationModal;
