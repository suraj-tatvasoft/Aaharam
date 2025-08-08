import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import alarmIcon from '@/assets/header-alarm.svg';
import backArrow from '@/assets/backArrow.svg';
import ActivationModal from '@/components/modals/ActivationModal';
import Container from '@/components/Container';
import { BulkPassMenu } from '@/data';

const BulkPass: React.FC = () => {
  const navigate = useNavigate();
  const [isActivationOpen, setActivationOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <Container>
      <div
        className="relative flex flex-1 flex-col px-4 pb-4 pt-4"
        style={{
          background: 'linear-gradient(180deg, #DAFFD9 0%, #FFFFFF 132.38%)',
        }}
      >
        <div className="mb-5 flex items-center justify-between">
          <button
            className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#EEFFED]"
            onClick={() => navigate(-1)}
            aria-label="Back"
          >
            <img src={backArrow} alt="Back" className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="h-[42px] w-[42px] flex-shrink-0 overflow-hidden rounded-full ">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="User profile"
                className="h-full w-full object-cover"
                onClick={() => navigate('/profile')}
              />
            </div>
            <button
              className="relative flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white"
              style={{ backgroundColor: '#EEFFED' }}
              aria-label="Notifications"
              onClick={() => navigate('/notifications')}
            >
              <img src={alarmIcon} alt="Alarm" />
              <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-destructive text-[8px] text-white">
                •
              </span>
            </button>
          </div>
        </div>

        <div className="mb-10 flex flex-col items-center text-center">
          <span className="text-xs font-medium text-[#212121]">Exclusive discount on</span>
          <span
            className="mt-2 text-[#212121]"
            style={{
              fontFamily: 'Outfit',
              fontWeight: 600,
              fontStyle: 'SemiBold',
              fontSize: '36px',
              lineHeight: '100%',
              letterSpacing: '0%',
              textAlign: 'center',
              textTransform: 'uppercase',
            }}
          >
            BULK PASS
          </span>
          <span className="mt-4 text-xs text-[#212121]">Grab ₹220 Discount on Lunch Meal</span>
        </div>

        <div className="mb-4">
          <span
            className="text-base font-medium text-[#212121]"
            style={{
              fontFamily: 'Outfit',
              fontWeight: 500,
              fontStyle: 'Medium',
              fontSize: '20px',
              lineHeight: '100%',
              letterSpacing: '0px',
            }}
          >
            Recommended for you
          </span>
        </div>

        <div className="flex flex-1 flex-col">
          {BulkPassMenu.map((item, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <div
                key={idx}
                className={`border-radius-[16px] mb-4 flex rounded-xl bg-white p-1 shadow-[0px_0px_20px_0px_#F25D460D]`}
              >
                <img src={item.image} alt={item.title} className="border-radius-[12px] h-[112px] w-[112px] rounded-md object-cover" />
                <div className="flex flex-1 flex-col justify-between p-[10px]">
                  <div>
                    <div
                      className="text-[#212121]"
                      style={{
                        marginBottom: '14px',
                        fontFamily: 'Outfit',
                        fontWeight: 400,
                        fontStyle: 'Regular',
                        fontSize: '16px',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        color: '#797979',
                        fontFamily: 'Outfit',
                        fontWeight: 300,
                        fontStyle: 'Light',
                        fontSize: '12px',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                      }}
                    >
                      {item.description}
                    </div>
                  </div>
                  <div className="mt-2 flex items-end justify-between">
                    <div className="flex items-end">
                      <span
                        className="text-[#212121]"
                        style={{
                          fontFamily: 'Outfit',
                          fontWeight: 400,
                          fontStyle: 'Regular',
                          fontSize: '16px',
                          lineHeight: '100%',
                          letterSpacing: '0%',
                        }}
                      >
                        ₹{item.price.discounted}/
                      </span>
                      <span
                        className="ml-1 text-sm text-[#797979] line-through"
                        style={{
                          color: '#797979',
                          fontFamily: 'Outfit',
                          fontWeight: 300,
                          fontStyle: 'Light',
                          fontSize: '12px',
                          lineHeight: '100%',
                          letterSpacing: '0%',
                        }}
                      >
                        ₹{item.price.original}
                      </span>
                    </div>
                    <button
                      className={`flex items-center justify-center ${isSelected ? 'bg-[#E9FFE4] border-green-600 text-green-700' : ''}`}
                      style={{
                        width: '70px',
                        height: '32px',
                        fontFamily: 'Outfit',
                        fontWeight: 500,
                        fontStyle: 'Medium',
                        fontSize: '14px',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        backgroundColor: isSelected ? '#38963B' : '#ffffff',
                        color: isSelected ? '#ffffff' : '#38963B',
                        borderRadius: '8px',
                        border: `1.5px solid ${isSelected ? '#38963B' : '#38963B'}`,
                        transition: 'all 0.2s',
                        cursor: 'pointer',
                      }}
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
          className="w-full"
          style={
            selectedIdx === null
              ? {
                  height: '43px',
                  fontFamily: 'Outfit',
                  fontWeight: 500,
                  fontStyle: 'Medium',
                  fontSize: '16px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  color: '#B0B0B0',
                  border: '1px solid #E0E0E0',
                  backgroundColor: '#F3F3F3',
                  borderRadius: '8px',
                  cursor: 'not-allowed',
                  opacity: 1,
                  transition: 'background 0.2s',
                  boxShadow: 'none',
                }
              : {
                  height: '43px',
                  fontFamily: 'Outfit',
                  fontWeight: 500,
                  fontStyle: 'Medium',
                  fontSize: '16px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  color: '#FFFFFF',
                  border: '1px solid #38963B',
                  backgroundColor: '#38963B',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  opacity: 1,
                  transition: 'background 0.2s',
                }
          }
          onClick={() => {
            if (selectedIdx !== null) setActivationOpen(true);
          }}
          disabled={selectedIdx === null}
        >
          {selectedIdx === null
            ? 'Buy Monthly Pass'
            : `Buy Monthly Pass - ₹${BulkPassMenu[selectedIdx].price.discounted}`}
        </button>
      </div>

      <ActivationModal isOpen={isActivationOpen} onClose={() => setActivationOpen(false)} />
    </Container>
  );
};

export default BulkPass;
