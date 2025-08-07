import React from 'react';
import Container from '@/components/Container';
import { useNavigate } from 'react-router-dom';
import headerHome from '@/assets/header-home.svg';
import headerAlarm from '@/assets/header-alarm.svg';
interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  modifiers?: {
    [groupId: string]: string[];
    note?: string[];
  };
}

interface OrderDetailProps {
  orderId: string;
  tokenNumber: number;
  date: string;
  time: string;
  items: OrderItem[];
  onCancel?: () => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ orderId, tokenNumber, date, time, items, onCancel }) => {
  const navigate = useNavigate();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <Container>
      <div className="flex h-full flex-col bg-[#F7F7F7]">
        {/* Top Navigation Bar */}
        <div className="sticky top-0 z-10 flex items-center bg-white px-4 pb-3 pt-4">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full shadow"
            style={{ backgroundColor: '#E9FFE4' }}
            onClick={() => navigate('/food-delivery')}
          >
            <img src={headerHome} alt="Home" />
          </div>
          <span className="ml-2 text-[18px] font-normal leading-[23px] text-[#212121]">Order #{orderId}</span>
          <div
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-full shadow"
            style={{ backgroundColor: '#E9FFE4' }}
            onClick={() => navigate('/notifications')}
          >
            <img src={headerAlarm} alt="Bell" />
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="scrollbar-hide flex-1 overflow-y-auto">
            {/* Token Section */}
            <div className="font-outfit flex w-full flex-col items-center bg-[#F7F7F7] py-8">
              <div className="text-[20px] font-normal text-[#212121]">Token no</div>
              <div className="text-[50px] font-semibold uppercase text-[#212121]">{tokenNumber}</div>
              <div className="flex gap-2 text-[14px] font-light text-[#232323]">
                <span>{date}</span>
                <span>{time}</span>
              </div>
            </div>
            {/* Items */}
            <div className="px-4">
              <div className="mb-2 text-[16px] font-medium text-[#212121]">Items</div>

              {items.map((item) => (
                <div key={item.id} className="mb-2 flex flex-col rounded-[16px] bg-white px-4 py-3 shadow-[0_2px_8px_0_rgba(33,33,33,0.04)]">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="mr-4 h-[46px] w-[46px] rounded-[12px] border border-[#ECECEC] object-cover" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[16px] font-normal text-[#212121]">{item.name}</span>
                        <span className="text-[16px] font-normal text-[#232323]">{item.quantity}</span>
                      </div>
                    </div>
                  </div>
                  {item.modifiers && item.modifiers.modifiers && item.modifiers.modifiers.length > 0 && (
                    <div className="mt-2 flex flex-col">
                      {item.modifiers.modifiers.map((d, i) => (
                        <span key={i} className="text-[14px] font-normal text-[#494949]">
                          - {d}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {/* Bill */}
              <div className="mb-2 text-[16px] font-medium text-[#212121]">Bill</div>
              <div className="rounded-[16px] bg-white p-4 text-sm">
                {items.map((item, idx) => (
                  <React.Fragment key={item.id}>
                    <div className="mb-3 flex justify-between">
                      <span>{item.name}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                    {idx < items.length - 1 && <div className="mb-3 border-b border-gray-200" />}
                  </React.Fragment>
                ))}
                <div className="flex justify-between border-t py-3 font-semibold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4">
            {/* Cancel Button */}
            <button className="w-full rounded-lg border border-green-600 p-3 font-medium text-green-600" onClick={onCancel}>
              Cancel your Order
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OrderDetail;
