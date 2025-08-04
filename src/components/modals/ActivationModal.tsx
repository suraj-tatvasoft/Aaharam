import React, { useState } from "react";
import CongratulationsModal from "./CongratulationsModal";

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
      <div style={{ backdropFilter: "blur(8px)" }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl w-11/12 max-w-sm" style={{ boxShadow: '0px -6px 20px 0px #A8A8A866' }}>
          <div className="py-5">
            <h3 className="text-lg font-semibold text-center mb-3 px-6">Activation</h3>
            <div className="w-full h-1 mb-4" style={{ background: '#E5E7EB', height: '4px', borderRadius: '2px' }} />
            <div className="text-sm text-center text-gray-700 leading-relaxed mb-4 px-6">
              Your request has been received.<br />
              Make payment directly on Billing Desk<br />
              and get it activated.
            </div>
            <div className="w-full h-1 mb-4" style={{ background: '#E5E7EB', height: '4px', borderRadius: '2px' }} />
            <button
              className="block mx-auto text-green-500 font-medium mt-2 cursor-pointer focus:outline-none"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="block mx-auto text-blue-500 font-medium mt-2 cursor-pointer focus:outline-none"
              onClick={handleCongratsOpen}
            >
              Congratulations
            </button>
          </div>
        </div>
      </div>
      <CongratulationsModal
        isOpen={isCongratsOpen}
        onClose={handleCongratsClose}
      />
    </>
  );
};

export default ActivationModal;
