import React from 'react';
import PageLayout from '@/components/PageLayout';
import { useParams } from 'react-router-dom';
import { ORDERS } from './OrderHistory';
import noShow from '@/assets/no-show.svg';

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
      <div className="font-outfit flex w-full flex-col items-center bg-[#F7F7F7] py-8">
        <div className="text-[20px] font-normal text-[#212121]">Token no</div>
        <div className="text-[50px] font-semibold uppercase text-[#212121]">{order.token}</div>
        <div className="flex gap-2 text-[14px] font-light text-[#232323]">
          <span>{order.date}</span>
          <span>{order.time}</span>
        </div>
        {order.status === 'Completed' ? (
          <div className="mt-3 flex items-center rounded-full bg-[#E9FFE4] px-4 py-1 text-[12px] text-[#38963B]">
            Completed
            <svg className="ml-1" width="14" height="14" fill="none" viewBox="0 0 14 14">
              <circle cx="7" cy="7" r="7" fill="#38963B" />
              <path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ) : order.status === 'Rejected' ? (
          <div className="mt-3 flex items-center rounded-full bg-[#FFE9E9] px-4 py-1 text-[12px] font-medium text-[#E74C3C]">
            Rejected
            <svg className="ml-1" width="18" height="18" fill="none" viewBox="0 0 18 18">
              <path d="M6 6l6 6M12 6l-6 6" stroke="#E74C3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ) : order.status === 'No Show' ? (
          <div className="mt-3 flex items-center gap-2 rounded-full bg-[#F4EDFF] px-4 py-1 text-[12px] font-medium text-[#A259FF]">
            No Show
            <img src={noShow} alt="No Show" />
          </div>
        ) : order.status === 'Cancelled' ? (
          <div className="mt-3 inline-flex items-center rounded-full bg-[#E2E2E2] px-3 py-1 text-[12px] font-medium text-[#212121]">
            Cancelled
            <svg
              className="ml-1 align-middle"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: 'inline', verticalAlign: 'middle' }}
            >
              <path d="M6 6l6 6M12 6l-6 6" stroke="#232323" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
        ) : null}
      </div>
      <div className="w-full px-4 pb-4">
        <div className="mb-2 text-[16px] font-medium text-[#212121]">Items</div>
        <div className="mb-4 flex flex-col gap-4">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex flex-col rounded-[16px] bg-white px-4 py-3 shadow-[0_2px_8px_0_rgba(33,33,33,0.04)]">
              <div className="flex items-center">
                <img src={item.image} alt={item.name} className="mr-4 h-[46px] w-[46px] rounded-[12px] border border-[#ECECEC] object-cover" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[16px] font-normal text-[#212121]">{item.name}</span>
                    <span className="text-[16px] font-normal text-[#232323]">{item.qty}</span>
                  </div>
                </div>
              </div>
              {item.details && item.details.length > 0 && (
                <div className="mt-2 flex flex-col">
                  {item.details.map((d, i) => (
                    <span key={i} className="text-[14px] font-normal text-[#494949]">
                      - {d}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mb-2 text-[16px] font-medium text-[#212121]">Bill</div>
        <div className="mb-4 rounded-[16px] bg-white px-4 py-4">
          {order.bill.map((b, i) => (
            <div key={i} className="flex justify-between py-1 text-[14px] font-light text-[#212121]">
              <span>{b.name}</span>
              <span>₹{b.amount}</span>
            </div>
          ))}
          <div className="my-2 border-t border-[rgba(33,33,33,0.10)]"></div>
          <div className="flex justify-between text-[14px] font-medium text-[#212121]">
            <span>Total</span>
            <span>₹{order.total}</span>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default OrderHistoryDetail;
