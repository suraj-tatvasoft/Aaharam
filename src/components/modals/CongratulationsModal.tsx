import React from "react";
import { useNavigate } from "react-router-dom";
import celebration from "@/assets/congratulation.svg";

interface CongratulationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CongratulationsModal: React.FC<CongratulationsModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <div style={{ backdropFilter: "blur(8px)" }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-11/12 max-w-sm" style={{ boxShadow: '0px -6px 20px 0px #A8A8A866' }}>
        <div className="py-5">
          <h3 className="text-lg font-semibold text-center mb-3 px-6">Congratulations</h3>
          <div className="w-full h-1 mb-4" style={{ background: '#E5E7EB', height: '4px', borderRadius: '2px' }} />
          <div className="flex justify-center mb-4">
            <img src={celebration} alt="Celebration" />
          </div>
          <div className="text-sm text-center text-gray-700 leading-relaxed mb-4 px-6">
            Your bulk pass has been successfully activated. You can now enjoy regular lunch meals using your pass.
          </div>
          <div className="w-full h-1 mb-4" style={{ background: '#E5E7EB', height: '4px', borderRadius: '2px' }} />
          <button
            className="block mx-auto text-green-500 font-medium mt-2 cursor-pointer focus:outline-none"
            onClick={() => navigate('/monthly-pass-summary')}
          >
            View Pass
          </button>
        </div>
      </div>
    </div>
  );
};

export default CongratulationsModal;
