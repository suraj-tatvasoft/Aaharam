import React from 'react';
import Container from '@/components/Container';
import { useNavigate } from 'react-router-dom';
import profileBack from '@/assets/profile-back.svg';
import notificationIcon from '@/assets/header-alarm.svg';

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
      <div className="flex h-full w-full flex-1 flex-col items-center overflow-hidden bg-gradient-to-r from-[#F7F7F7] to-white to-50%">
        <div className="flex-grow-1 flex w-full items-center justify-between rounded-bl-[22px] bg-[#FFFFFF] p-4">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => navigate('/food-delivery')}
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#E9FFE4]"
              aria-label="Back"
              type="button"
            >
              <img src={profileBack} alt="Back" className="h-4 w-4" />
            </button>
            <span className="text-[18px] font-normal leading-[23px] text-[#212121]">Order #{orderId}</span>
          </div>
          <button
            className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#E9FFE4]"
            aria-label="Notifications"
            type="button"
            onClick={() => navigate('/notifications')}
          >
            <div className="relative">
              <img src={notificationIcon} alt="Notifications" className="size-5" />
              <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-[#E92E27]"></span>
            </div>
          </button>
        </div>

        <div className="scrollbar-hide flex-grow-1 flex h-full w-full flex-1 flex-col items-center overflow-y-auto rounded-tr-[22px] bg-[#F7F7F7]">
          <div className="relative mx-auto flex h-full w-full max-w-md flex-1 flex-col bg-gradient-to-r from-[#F7F7F7] to-white to-50%">
            <div className="flex-grow-1 scrollbar-hide mb-[76px] flex flex-1 flex-col overflow-y-auto rounded-br-[22px] bg-[#F7F7F7]">
              <div className="flex w-full flex-col items-center gap-5 py-8">
                <div className="text-[20px] font-medium leading-[14px] text-[#212121]">Token no</div>
                <div className="text-[50px] font-medium leading-[35px] text-[#212121]">{tokenNumber}</div>
                <div className="flex gap-4 text-[14px] font-light leading-[10px] text-[#212121]">
                  <span>{date}</span>
                  <span>{time}</span>
                </div>

                <div className="flex h-7 items-center gap-[6px] rounded-full bg-[#E9FFE4] px-[10px] text-[#38963B]">
                  <span className="text-[12px] font-normal leading-[8px]">Completed</span>
                  <svg width="12" height="12" fill="none" viewBox="0 0 14 14">
                    <circle cx="7" cy="7" r="7" fill="#38963B" />
                    <path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <div className="flex w-full flex-col gap-4 px-4 pb-4">
                <div className="text-[16px] font-medium leading-[11px] text-[#212121]">Items</div>
                <div className="flex flex-col gap-4">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex flex-col rounded-[16px] bg-white p-1 pr-4">
                      <div className="flex items-center gap-2.5">
                        <img src={item.image} alt={item.name} className="h-[46px] w-[46px] rounded-[12px] object-cover" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[16px] font-normal text-[#212121]">{item.name}</span>
                            <span className="text-[14px] font-normal text-[#212121]">{item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-[16px] font-medium leading-[11px] text-[#212121]">Bill</div>
                <div className="flex flex-col gap-4 rounded-[16px] bg-white p-4">
                  <div className="flex flex-col gap-[14px]">
                    {items.map((b, i) => (
                      <div key={i} className="flex justify-between text-[14px] font-light leading-[10px] text-[#212121]">
                        <span>{b.name}</span>
                        <span>₹{b.price * b.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-[#2121211A]"></div>
                  <div className="flex justify-between text-[14px] font-medium leading-[10px] text-[#212121]">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-grow-1 absolute bottom-0 left-0 right-0 flex w-full flex-col gap-3 rounded-tl-[22px] bg-[#FFFFFF] p-4">
              <button
                type="button"
                onClick={onCancel}
                className="h-11 w-full rounded-[8px] border border-[#38963B] bg-white text-center text-[16px] font-medium leading-[11px] text-[#38963B] transition-colors hover:bg-[#38963B] hover:text-white"
              >
                Cancel your Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OrderDetail;
