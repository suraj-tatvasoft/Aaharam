import React from 'react';
import { useNavigate } from 'react-router-dom';
import celebration from '@/assets/congratulation.svg';

interface CongratulationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CongratulationsModal: React.FC<CongratulationsModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <div style={{ backdropFilter: 'blur(8px)' }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-11/12 max-w-sm rounded-xl bg-white" style={{ boxShadow: '0px -6px 20px 0px #A8A8A866' }}>
        <div className="py-5">
          <h3 className="mb-3 px-6 text-center text-lg font-semibold">Congratulations</h3>
          <div className="mb-4 h-1 w-full" style={{ background: '#E5E7EB', height: '4px', borderRadius: '2px' }} />
          <div className="mb-4 flex justify-center">
            <img src={celebration} alt="Celebration" />
          </div>
          <div className="mb-4 px-6 text-center text-sm leading-relaxed text-gray-700">
            Your bulk pass has been successfully activated. You can now enjoy regular lunch meals using your pass.
          </div>
          <div className="mb-4 h-1 w-full" style={{ background: '#E5E7EB', height: '4px', borderRadius: '2px' }} />
          <button
            className="mx-auto mt-2 block cursor-pointer font-medium text-green-500 focus:outline-none"
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
