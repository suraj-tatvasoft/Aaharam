import React from 'react';
import PageLayout from '@/components/PageLayout';
import { useParams } from 'react-router-dom';
import { ORDERS } from './OrderHistory';
import noShow from '@/assets/no-show.svg';
import { X } from 'lucide-react';

const MOCK_DETAILS = {
  token: 125,
  date: '11th July 25',
  time: '12:30 PM',
  items: [
    {
      name: 'Vada pav',
      qty: 2,
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=64&q=80',
      details: ['Butter', 'Less Spicy'],
    },
    {
      name: 'Veg. Sandwich',
      qty: 2,
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=64&q=80',
      details: ['Grilled'],
    },
  ],
  bill: [
    { name: 'Masala Tea', amount: 30 },
    { name: 'Poha', amount: 80 },
  ],
  total: 110,
};

const OrderHistoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const orderSummary = ORDERS.find((o) => String(o.id) === String(id));

  const order = orderSummary
    ? {
        ...MOCK_DETAILS,
        ...orderSummary,
      }
    : { ...MOCK_DETAILS, id: id || '-', status: 'Completed' };

  return (
    <PageLayout title={`Order #${order.id}`}>
      <div className="flex w-full flex-col items-center gap-5 py-8">
        <div className="text-[20px] font-medium leading-[14px] text-[#212121]">Token no</div>
        <div className="text-[50px] font-semibold leading-[35px] text-[#212121]">{order.token}</div>
        <div className="flex gap-4 text-[14px] font-light leading-[10px] text-[#212121]">
          <span>{order.date}</span>
          <span>{order.time}</span>
        </div>
        {order.status === 'Completed' ? (
          <div className="flex h-7 items-center gap-[6px] rounded-full bg-[#E9FFE4] px-[10px] text-[#38963B]">
            <span className="text-[12px] font-normal leading-[8px]">Completed</span>
            <svg width="12" height="12" fill="none" viewBox="0 0 14 14">
              <circle cx="7" cy="7" r="7" fill="#38963B" />
              <path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ) : order.status === 'Rejected' ? (
          <div className="flex h-7 items-center gap-[6px] rounded-full bg-[#FFE9E9] px-[10px] text-[#F53939]">
            <span className="text-[12px] font-normal leading-[8px]">Rejected</span>
            <X className="h-[14px] w-[14px]" />
          </div>
        ) : order.status === 'No Show' ? (
          <div className="flex h-7 items-center gap-[6px] rounded-full bg-[#F6F0F9] px-[10px] text-[#A168C5]">
            <span className="text-[12px] font-normal leading-[8px]">No Show</span>
            <img src={noShow} alt="No Show" />
          </div>
        ) : order.status === 'Cancelled' ? (
          <div className="flex h-7 items-center gap-[6px] rounded-full bg-[#E2E2E2] px-[10px] text-[#212121]">
            <span className="text-[12px] font-normal leading-[8px]">Cancelled</span>
            <X className="h-[14px] w-[14px]" />
          </div>
        ) : null}
      </div>

      <div className="flex w-full flex-col gap-4 px-4 pb-4">
        <div className="text-[16px] font-medium leading-[11px] text-[#212121]">Items</div>
        <div className="flex flex-col gap-4">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex flex-col rounded-[16px] bg-white p-1 pr-4">
              <div className="flex items-center gap-2.5">
                <img src={item.image} alt={item.name} className="h-[46px] w-[46px] rounded-[12px] object-cover" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[16px] font-normal text-[#212121]">{item.name}</span>
                    <span className="text-[14px] font-normal text-[#212121]">{item.qty}</span>
                  </div>
                </div>
              </div>
              {item.details && item.details.length > 0 && (
                <div className="flex flex-col gap-[10px] p-[10px]">
                  {item.details.map((d, i) => (
                    <span key={i} className="text-[14px] font-normal leading-[10px] text-[#494949]">
                      - {d}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-[16px] font-medium leading-[11px] text-[#212121]">Bill</div>
        <div className="flex flex-col gap-4 rounded-[16px] bg-white p-4">
          <div className="flex flex-col gap-[14px]">
            {order.bill.map((b, i) => (
              <div key={i} className="flex justify-between text-[14px] font-light leading-[10px] text-[#212121]">
                <span>{b.name}</span>
                <span>₹{b.amount}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-[#2121211A]"></div>
          <div className="flex justify-between text-[14px] font-medium leading-[10px] text-[#212121]">
            <span>Total</span>
            <span>₹{order.total}</span>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default OrderHistoryDetail;
