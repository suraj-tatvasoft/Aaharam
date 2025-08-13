import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profileBack from '@/assets/profile-back.svg';
import Container from '@/components/Container';
import EmptyState from '@/components/EmptyState';
import { CheckCircle2, XCircle, EyeOff, Ban } from 'lucide-react';
import profileAccordion from '@/assets/profile-accordion.svg';

const TABS = [
  { label: 'Completed', count: 78 },
  { label: 'Rejected', count: 4 },
  { label: 'No Show', count: 3 },
  { label: 'Cancelled', count: 1 },
];

export const ORDERS = [
  { id: 27211, amount: 110, date: '18th Apr 25', status: 'Completed' },
  { id: 12545, amount: 200, date: '18th Apr 25', status: 'Completed' },
  { id: 27212, amount: 110, date: '18th Apr 25', status: 'Completed' },
  { id: 12546, amount: 200, date: '18th Apr 25', status: 'Completed' },
  { id: 27213, amount: 110, date: '18th Apr 25', status: 'Completed' },
  { id: 12547, amount: 200, date: '18th Apr 25', status: 'Completed' },
  { id: 45575, amount: 10, date: '18th Apr 25', status: 'Rejected' },
  { id: 78451, amount: 400, date: '18th Apr 25', status: 'Completed' },
  // { id: 45523, amount: 300, date: '18th Apr 25', status: 'No Show' },
  { id: 45878, amount: 200, date: '18th Apr 25', status: 'Completed' },
  { id: 27211, amount: 110, date: '18th Apr 25', status: 'Completed' },
  { id: 27220, amount: 110, date: '18th Apr 25', status: 'Cancelled' },
  { id: 27213, amount: 110, date: '18th Apr 25', status: 'Completed' },
  { id: 27214, amount: 110, date: '18th Apr 25', status: 'Completed' },
  // { id: 27215, amount: 110, date: '18th Apr 25', status: 'No Show' },
  { id: 27216, amount: 110, date: '18th Apr 25', status: 'Rejected' },
];

const OrderHistory: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  React.useEffect(() => {
    if (tabRefs.current[activeTab]) {
      tabRefs.current[activeTab]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeTab]);

  return (
    <Container>
      <div className="flex flex-1 flex-col overflow-hidden bg-[#F7F7F7]">
        <div>
          <div className="flex items-center bg-[#FFFFFF] px-4 pb-4 pt-4">
            <button className="mr-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#E9FFE5]" onClick={() => navigate(-1)}>
              <img src={profileBack} alt="Back" className="h-4 w-4" />
            </button>
            <span className="text-lg font-normal text-[#212121]">Order History</span>
          </div>

          <div className="scrollbar-hide flex max-w-full flex-nowrap justify-start overflow-x-auto whitespace-nowrap border-b border-[#ECECEC] bg-[#FFFFFF]">
            {TABS.map((tab, idx) => {
              return (
                <button
                  key={tab.label}
                  ref={(el) => (tabRefs.current[idx] = el)}
                  className={`flex flex-col items-center px-4 pb-3 pt-2 transition-colors duration-150 ${
                    activeTab === idx ? 'border-b-2 border-[#38963B]' : ''
                  }`}
                  onClick={() => setActiveTab(idx)}
                >
                  <div
                    className={`relative px-2 text-[14px] font-normal leading-[20px] duration-150 ${
                      activeTab === idx ? 'font-normal text-[#38963B]' : 'font-normal text-[#212121]'
                    }`}
                    style={{ display: 'inline-block' }}
                  >
                    {tab.label} <span>({tab.count})</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="scrollbar-hide flex-1 overflow-y-auto bg-[#F7F7F7] px-4 pb-4 pt-4">
          {(() => {
            const filteredOrders = ORDERS.filter((order) => order.status === TABS[activeTab].label);
            const tabIconMap = {
              Completed: <CheckCircle2 className="mb-2 h-12 w-12 text-green-400" />,
              Rejected: <XCircle className="mb-2 h-12 w-12 text-red-400" />,
              'No Show': <EyeOff className="mb-2 h-12 w-12 text-gray-400" />,
              Cancelled: <Ban className="mb-2 h-12 w-12 text-yellow-400" />,
            };
            if (filteredOrders.length === 0) {
              return (
                <EmptyState
                  title={`No ${TABS[activeTab].label} Orders`}
                  description={`You have no ${TABS[activeTab].label.toLowerCase()} orders yet.`}
                  icon={tabIconMap[TABS[activeTab].label as keyof typeof tabIconMap]}
                />
              );
            }
            return filteredOrders.map((order, i) => (
              <div
                key={i}
                className="mb-3 flex cursor-pointer items-center justify-between rounded-[16px] bg-[#FFFFFF] p-4 shadow-[0_0_20px_0_#F25D460D]"
                onClick={() => navigate(`/order-history/${order.id}`)}
              >
                <div className="flex flex-col gap-2">
                  <div className="text-base font-medium text-[#212121]">Order #{order.id}</div>
                  <div className="text-[14px] font-medium text-[#212121]">₹{order.amount}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[14px] font-light text-[#212121]">{order.date}</span>
                  <img src={profileAccordion} alt="Expand" className="h-[10px] w-[5px]" />
                </div>
              </div>
            ));
          })()}
        </div>
      </div>
    </Container>
  );
};

export default OrderHistory;
