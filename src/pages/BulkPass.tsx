import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import thaliImg from '@/assets/regular-thali.jpg';
import alarmIcon from '@/assets/header-alarm.svg';
import backArrow from '@/assets/backArrow.svg';
import ActivationModal from '@/components/modals/ActivationModal';
import Container from '@/components/Container';

const thalis = [
  {
    title: 'Regular Thali',
    desc: '4 Butter Roti, 2 Sabji, Gujarati Dal, Bhat, Salad, Mango Juice',
    price: 1540,
    original: 1760,
    img: thaliImg
  },
  {
    title: 'Regular Thali - with buttermilk',
    desc: '4 Butter Roti, 2 Sabji, Gujarati Dal, Bhat, Salad, Mango Juice, Buttermilk',
    price: 1760,
    original: 1980,
    img: thaliImg
  }
];

const BulkPass: React.FC = () => {
  const navigate = useNavigate();
  const [isActivationOpen, setActivationOpen] = useState(false);

  return (
    <Container>
      <div
        className="relative flex flex-1 flex-col px-4 pb-4 pt-4"
        style={{
          background: 'linear-gradient(180deg, #DAFFD9 0%, #FFFFFF 132.38%)'
        }}
      >
        <div className="mb-4 flex items-center justify-between">
          <button
            className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#EEFFED]"
            onClick={() => navigate(-1)}
            aria-label="Back"
          >
            <img src={backArrow} alt="Back" className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-primary/20">
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
              <img src={alarmIcon} alt="Alarm" className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-destructive text-[8px] text-white">
                •
              </span>
            </button>
          </div>
        </div>

        <div className="mb-6 flex flex-col items-center text-center">
          <span className="text-xs font-medium text-[#212121]">Exclusive discount on</span>
          <span className="mt-1 text-3xl font-semibold text-[#212121]">BULK PASS</span>
          <span className="mt-1 text-xs text-[#212121]">Grab ₹220 Discount on Lunch Meal</span>
        </div>

        <div className="mb-2">
          <span className="text-base font-medium text-[#212121]">Recommended for you</span>
        </div>

        <div className="flex flex-1 flex-col">
          {thalis.map((thali, idx) => (
            <div key={idx} className="mb-4 flex rounded-xl bg-white p-3 shadow-sm">
              <img src={thali.img} alt={thali.title} className="mr-3 h-[112px] w-[112px] rounded-md object-cover" />
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="mb-1 text-base font-medium text-[#212121]">{thali.title}</div>
                  <div className="mb-2 text-xs text-[#797979]">{thali.desc}</div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-base font-semibold text-[#212121]">₹{thali.price}</span>
                    <span className="ml-2 text-sm text-[#797979] line-through">₹{thali.original}</span>
                  </div>
                  <button className="flex h-8 w-16 items-center justify-center rounded-md border border-[#38963B] text-sm text-[#38963B] transition hover:bg-[#38963B] hover:text-white">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="w-full rounded-lg bg-green-600 py-3 text-center text-base font-bold text-white shadow-lg"
          onClick={() => setActivationOpen(true)}
        >
          Buy Monthly Pass - ₹1540
        </button>
      </div>

      <ActivationModal isOpen={isActivationOpen} onClose={() => setActivationOpen(false)} />
    </Container>
  );
};

export default BulkPass;
