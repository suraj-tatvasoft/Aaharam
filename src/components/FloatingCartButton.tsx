import React from 'react';
import { ShoppingCart, ChevronRight } from 'lucide-react';
import cartIcon from '@/assets/cart-icon-white.svg'

interface FloatingCartButtonProps {
  count: number;
  onClick: () => void;
}

const FloatingCartButton: React.FC<FloatingCartButtonProps> = ({ count, onClick }) => {
  if (count === 0) return null;
  return (
    <button
      className="fixed z-40 flex items-center justify-between"
      style={{
        height: 52,
        minWidth: 142,
        paddingLeft: 4,
        paddingRight: 8,
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 26,
        background: '#38963B',
        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        position: 'fixed',
        bottom: 32,
        left: '50%',
        transform: 'translateX(-50%)',
        border: 'none',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#44AC48',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src={cartIcon} width="19px" height="19px" />
        </div>
        <span style={{ color: 'white', fontWeight: 400, fontSize: 16,paddingLeft: 10, paddingRight: 10 }}>
          {count} Item{count > 1 ? 's' : ''}
        </span>
        <ChevronRight size={20} color="white" />
      </div>
      
    </button>
  );
};

export default FloatingCartButton;
