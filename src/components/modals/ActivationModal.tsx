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
  const handleViewPass = () => {
    setCongratsOpen(false);
    // You can add further navigation here if needed
  };

  if (!isOpen) return null;

  return (
    <>
      <div style={{ backdropFilter: 'blur(8px)' }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-11/12 max-w-sm rounded-xl bg-white" style={{ boxShadow: '0px -6px 20px 0px #A8A8A866' }}>
          <div className="py-5">
            <h3 className="mb-3 px-6 text-center text-lg font-semibold">Activation</h3>
            <div className="mb-4 h-1 w-full" style={{ background: '#E5E7EB', height: '4px', borderRadius: '2px' }} />
            <div className="mb-4 px-6 text-center text-sm leading-relaxed text-gray-700">
              Your request has been received.
              <br />
              Make payment directly on Billing Desk
              <br />
              and get it activated.
            </div>
            <div className="mb-4 h-1 w-full" style={{ background: '#E5E7EB', height: '4px', borderRadius: '2px' }} />
            <button className="mx-auto mt-2 block cursor-pointer font-medium text-green-500 focus:outline-none" onClick={onClose}>
              Cancel
            </button>
            <button className="mx-auto mt-2 block cursor-pointer font-medium text-blue-500 focus:outline-none" onClick={handleCongratsOpen}>
              Congratulations
            </button>
          </div>
        </div>
      </div>
      <CongratulationsModal isOpen={isCongratsOpen} onClose={handleCongratsClose} />
    </>
  );
};

export default ActivationModal;
