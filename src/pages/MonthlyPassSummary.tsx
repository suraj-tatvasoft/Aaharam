import React from 'react';
import { useNavigate } from 'react-router-dom';
import backArrow from '@/assets/backArrow.svg';
import alarmIcon from '@/assets/header-alarm.svg';
import pass1 from '@/assets/pass1.svg';
import pass2 from '@/assets/pass2.svg';
import pass3 from '@/assets/pass3.svg';
import Container from '@/components/Container';

const MonthlyPassSummary: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div
        className="flex flex-1 flex-col px-4 pb-8 pt-4"
        style={{
          background: 'linear-gradient(180deg, #DAFFD9 0%, #FFFFFF 132.38%)'
        }}
      >
        <div className="mb-6 flex items-center justify-between">
          <button
            className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white"
            style={{ backgroundColor: '#EEFFED' }}
            onClick={() => navigate('/')}
            aria-label="Back"
          >
            <img src={backArrow} alt="Back" className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
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

        {/* Title Section */}
        <div className="mb-6 flex flex-col items-center">
          <span className="text-center text-sm text-gray-600">Exclusive discount on</span>
          <h1 className="text-center text-3xl font-bold">BULK PASS</h1>
          <span className="text-center text-sm text-gray-600">Grab ₹220 Discount on Lunch Meal</span>
        </div>

        {/* Pass Summary Section */}
        <div className="mt-4">
          <div className="mb-2 text-lg font-semibold">Pass Summary</div>
          <div className="flex items-center gap-3 py-1 text-base">
            <img src={pass1} alt="Regular Thali" />
            <span className="font-medium text-gray-900">Regular Thali - without buttermilk</span>
          </div>
          <div className="flex items-center gap-3 py-1 text-sm text-gray-700">
            <img src={pass2} alt="Calendar" />
            <span>
              Start From:{' '}
              <span className="font-semibold">
                31<sup>st</sup> Jul 2025
              </span>
            </span>
            <span className="mx-2">|</span>
            <span>
              Valid Till:{' '}
              <span className="font-semibold">
                31<sup>st</sup> Aug 2025
              </span>
            </span>
          </div>
          <div className="flex items-center gap-3 py-1 text-sm text-gray-700">
            <img src={pass3} alt="Meals Used" />
            <span>
              Meals Used: <span className="font-semibold">12</span> of 22
            </span>
          </div>
        </div>

        {/* What's Included Section */}
        <div className="my-4 h-1 w-full bg-white" />
        <div className="pt-4">
          <div className="mb-2 text-lg font-semibold">What’s Included</div>
          <ul className="list-inside list-disc space-y-1 text-sm text-gray-800">
            <li>Valid for Lunch only (12:00 PM – 3:30 PM)</li>
            <li>Covers Regular Lunch Dish</li>
            <li>With or Without Buttermilk (based on plan)</li>
            <li>Not applicable for other items or combos</li>
            <li>Not valid for morning/evening snacks</li>
          </ul>
        </div>

        {/* Pass Terms Section */}
        <div className="my-4 h-1 w-full bg-white" />
        <div>
          <div className="mb-2 text-lg font-semibold">Pass Terms</div>
          <p className="text-sm leading-relaxed text-gray-800">
            This pass includes one regular lunch per working day. It is non-transferable and applicable only for standard lunch items. Buttermilk is
            included only if your plan covers it.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default MonthlyPassSummary;
