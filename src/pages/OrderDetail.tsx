import React from 'react';
import { Home, Bell } from 'lucide-react';
import Container from '@/components/Container';
import { useNavigate } from 'react-router-dom';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
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
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 shadow" onClick={() => navigate('/')}>
            <Home className="h-5 w-5 text-green-600" />
          </div>
          <span className="ml-2 font-medium text-gray-700">Order #{orderId}</span>
          <div className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-green-100" onClick={() => navigate('/notifications')}>
            <Bell className="h-5 w-5 text-green-600" />
          </div>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <div className="scrollbar-hide flex-1 overflow-y-auto">
            {/* Token Section */}
            <div className="text-center">
              <div className="text-sm text-gray-500">Token no</div>
              <div className="my-2 text-5xl font-bold">{tokenNumber}</div>
              <div className="mt-2 flex justify-center gap-6 text-sm text-gray-400">
                <span>{date}</span>
                <span>{time}</span>
              </div>
            </div>
            {/* Items */}
            <div className="">
              <div className="mb-2 mt-6 text-lg font-semibold text-black">Items</div>
              {items.map((item) => (
                <div key={item.id} className="mb-2 flex items-center justify-between rounded-xl bg-white py-1 pl-1 pr-2">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="h-12 w-12 rounded-[12px] object-cover" />
                    <span className="ml-3 text-sm font-medium">{item.name}</span>
                  </div>
                  <span className="text-base font-medium">{item.quantity}</span>
                </div>
              ))}
              {/* Bill */}
              <div className="mb-2 mt-6 text-lg font-semibold text-black">Bill</div>
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
          {/* Cancel Button */}
          <button className="w-full rounded-lg border border-green-600 p-3 font-medium text-green-600" onClick={onCancel}>
            Cancel your Order
          </button>
        </div>
      </div>
    </Container>
  );
};

export default OrderDetail;
