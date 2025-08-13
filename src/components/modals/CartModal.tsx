import React from 'react';
import { X } from 'lucide-react';
import { Minus, Plus } from 'lucide-react';
import { useOrder } from '@/context/OrderContext';
import { useNavigate } from 'react-router-dom';

interface CartItem {
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

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onQuantityChange: (id: string, quantity: number) => void;
  onClearCart: () => void;
  onGenerateToken: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cartItems, onQuantityChange, onClearCart, onGenerateToken }) => {
  const { setOrder } = useOrder();
  const navigate = useNavigate();
  if (!isOpen) return null;
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div
      style={{ backdropFilter: 'blur(2px)' }}
      className="fixed inset-0 z-50 flex items-end bg-black/10 p-0 sm:items-center sm:justify-center sm:p-4"
    >
      {/* Modal Container */}
      <div className="relative mx-auto w-full max-w-md rounded-t-[30px] bg-white shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute left-1/2 z-10 -translate-x-1/2 rounded-full border border-gray-200 p-2 shadow-md hover:bg-gray-100 focus:outline-none"
          style={{ top: '-58px', background: '#F5F5F5' }}
          aria-label="Close"
        >
          <X className="h-6 w-6 text-gray-700" />
        </button>
        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-4 pt-5">
          <span className="text-lg font-semibold">Cart</span>
          <button className="text-sm font-medium text-green-600" onClick={onClearCart}>
            Clear Cart
          </button>
        </div>
        <div className="h-1" style={{ background: '#F5F5F5' }}></div>
        {/* Cart Items */}
        <div className="flex max-h-48 flex-col gap-4 overflow-y-auto px-4 py-5">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <img src={item.image} alt={item.name} className="h-[46px] w-[46px] rounded-[16px] object-cover" />
              <div className="flex-1">
                <div className="text-sm font-medium">{item.name}</div>
                {item.modifiers && item.modifiers.modifiers && item.modifiers.modifiers.length > 0 && (
                  <div className="text-xs text-gray-500">{item.modifiers.modifiers.join(', ')}</div>
                )}
              </div>
              <span className="mr-2 text-base font-medium text-[#212121]" style={{ minWidth: 36, textAlign: 'right' }}>
                ₹{item.price}
              </span>
              {/* Quantity Selector */}
              <div
                style={{
                  width: 92,
                  height: 36,
                  borderRadius: 8,
                  padding: '4px 10px',
                  background: '#38963B',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  opacity: 1,
                }}
              >
                <button
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    width: 22,
                    height: 22,
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                  disabled={item.quantity === 1}
                >
                  <Minus size={18} color="#fff" />
                </button>
                <span style={{ width: 24, textAlign: 'center', color: '#fff', fontWeight: 500 }}>{item.quantity}</span>
                <button
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    width: 22,
                    height: 22,
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                >
                  <Plus size={18} color="#fff" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="h-1" style={{ background: '#F5F5F5' }}></div>
        {/* Bill Section */}
        <div className="bg-white p-4">
          <div className="mb-3 text-sm font-semibold">Bill</div>
          <div className="my-3 h-[2px] bg-gray-100"></div>
          <div className="space-y-3">
            {cartItems.map((item, index) => (
              <React.Fragment key={item.id + '-bill'}>
                <div className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="mt-3 flex justify-between border-t border-gray-200 pt-3 text-base font-bold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
        <div className="h-1" style={{ background: '#F5F5F5' }}></div>

        {/* Generate Token Button */}
        <div className="p-4">
          <button
            className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white shadow-md"
            onClick={() => {
              // Demo: generate dummy orderId/token/time
              const now = new Date();
              const orderId = String(Math.floor(Math.random() * 100000));
              const tokenNumber = Math.floor(Math.random() * 100) + 1;
              const date = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }).replace(/ /g, ' ');
              const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true });
              setOrder({
                orderId,
                tokenNumber,
                date: date.replace(',', ''),
                time,
                items: cartItems,
              });
              onClearCart();
              onClose();
              navigate('/order-detail');
            }}
          >
            Generate Token
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
