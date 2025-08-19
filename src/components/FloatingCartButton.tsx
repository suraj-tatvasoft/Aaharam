import React from 'react';
import cartIcon from '@/assets/cart-button-white.svg';

interface FloatingCartButtonProps {
  count: number;
  onClick: () => void;
}

const FloatingCartButton: React.FC<FloatingCartButtonProps> = ({ count, onClick }) => {
  if (count === 0) return null;
  return (
    <button
      className="fixed z-40 flex items-center"
      style={{
        // width: 118,
        height: 52,
        gap: 8,
        opacity: 1,
        borderRadius: 68,
        paddingTop: 6,
        paddingRight: 6,
        paddingBottom: 6,
        paddingLeft: 16,
        boxShadow: '0px 0px 16px 0px #546E7A4D',
        backdropFilter: 'blur(20px)',
        background: '#FFFFFFCC',
        position: 'fixed',
        bottom: 32,
        left: '50%',
        transform: 'translateX(-50%)',
      }}
      onClick={onClick}
    >
      <span style={{ color: '#212121', fontWeight: 400, fontSize: 16 }}>
        {count} Item{count > 1 ? 's' : ''}
      </span>
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: '#1A932E',
        }}
      >
        <img src={cartIcon} alt="Cart" style={{ width: 20, height: 20 }} />
      </span>
    </button>
  );
};

export default FloatingCartButton;
