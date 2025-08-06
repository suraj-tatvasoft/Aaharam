import React from "react";
import { Minus, Plus } from "lucide-react";
import { useOrder } from "@/context/OrderContext";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onQuantityChange: (id: string, quantity: number) => void;
  onClearCart: () => void;
  onGenerateToken: () => void;
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onQuantityChange,
  onClearCart,
  onGenerateToken,
}) => {
  const { setOrder } = useOrder();
  const navigate = useNavigate();
  if (!isOpen) return null;
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ backdropFilter: "blur(8px)" }} className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center sm:justify-center p-0 sm:p-4">
      {/* Modal Container */}
      <div className="w-full max-w-md mx-auto bg-white rounded-t-2xl p-4 pt-2 shadow-lg relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute left-1/2 -translate-x-1/2 -top-6 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-200"
        >
          <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 4.5L4.5 13.5" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
            <path d="M4.5 4.5L13.5 13.5" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        {/* Header */}
        <div className="flex justify-between items-center mb-2 pt-2">
          <span className="text-lg font-semibold">Cart</span>
          <button className="text-green-600 font-medium text-sm" onClick={onClearCart}>Clear Cart</button>
        </div>
        {/* Cart Items */}
        <div className="divide-y divide-gray-200 mb-2 max-h-48 overflow-y-auto">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center py-2 gap-2">
              <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
              <div className="flex-1">
                <div className="font-medium text-sm">{item.name}</div>
                <div className="text-xs text-gray-500">₹{item.price}</div>
              </div>
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
                <button style={{ color: '#fff', fontSize: 18, width: 22, height: 22, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => onQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity === 1}>
                  <Minus size={18} color="#fff" />
                </button>
                <span style={{ width: 24, textAlign: 'center', color: '#fff', fontWeight: 500 }}>{item.quantity}</span>
                <button style={{ color: '#fff', fontSize: 18, width: 22, height: 22, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => onQuantityChange(item.id, item.quantity + 1)}>
                  <Plus size={18} color="#fff" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Bill Section */}
        <div className="bg-white rounded-lg p-2 mb-2 border">
          <div className="font-semibold text-sm mb-1">Bill</div>
          {cartItems.map(item => (
            <div className="flex justify-between text-sm py-0.5" key={item.id+"-bill"}>
              <span>{item.name}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-base border-t mt-1 pt-1">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
        {/* Generate Token Button */}
        <button
          className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg mt-4 shadow-md"
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
  );
};

export default CartModal;
