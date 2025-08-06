import React from "react";
import { Home, Bell } from "lucide-react";

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

const OrderDetail: React.FC<OrderDetailProps> = ({
  orderId,
  tokenNumber,
  date,
  time,
  items,
  onCancel,
}) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Top Navigation Bar */}
      <div className="bg-white px-4 pt-4 pb-3 rounded-b-xl shadow flex items-center sticky top-0 z-10">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shadow">
          <Home className="text-green-600 w-5 h-5" />
        </div>
        <span className="ml-2 font-medium text-gray-700">Order #{orderId}</span>
        <div className="ml-auto w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <Bell className="text-green-600 w-5 h-5" />
        </div>
      </div>
      {/* Token Section */}
      <div className="px-4 mt-4 text-center">
        <div className="text-sm text-gray-500">Token no</div>
        <div className="text-5xl font-bold my-2">{tokenNumber}</div>
        <div className="flex justify-center gap-6 text-gray-400 text-sm mt-2">
          <span>{date}</span>
          <span>{time}</span>
        </div>
      </div>
      {/* Items */}
      <div className="px-4">
        <div className="font-semibold text-lg mt-6 mb-2 text-black">Items</div>
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-xl py-1 pl-1 pr-2 flex items-center justify-between mb-2">
            <div className="flex items-center">
              <img src={item.image} alt={item.name} className="w-12 h-12 rounded-[12px] object-cover" />
              <span className="ml-3 font-medium text-sm">{item.name}</span>
            </div>
            <span className="font-medium text-base">{item.quantity}</span>
          </div>
        ))}
        {/* Bill */}
        <div className="font-semibold text-lg mt-6 mb-2 text-black">Bill</div>
        <div className="bg-white rounded-[16px] p-4 text-sm">
          {items.map((item, idx) => (
            <React.Fragment key={item.id}>
              <div className="flex justify-between mb-3">
                <span>{item.name}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
              {idx < items.length - 1 && <div className="border-b border-gray-200  mb-3" />}
            </React.Fragment>
          ))}
          <div className="flex justify-between border-t py-3 font-semibold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>
      {/* Cancel Button */}
      <div className="px-4 pt-4 pb-8">
        <button
          className="w-full border border-green-600 text-green-600 font-medium p-3 rounded-lg"
          onClick={onCancel}
        >
          Cancel your Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
