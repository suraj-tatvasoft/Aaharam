import React from 'react';

interface SimpleSideItemCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  onAdd: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
  disabled?: boolean;
}

const SimpleSideItemCard: React.FC<SimpleSideItemCardProps> = ({ id, name, price, image, quantity, onAdd, onQuantityChange, disabled = false }) => {
  return (
    <div className="flex min-h-[64px] items-center rounded-2xl bg-white p-2 pr-4 shadow-sm" style={{ borderRadius: '16px' }}>
      <img src={image} alt={name} className="mr-3 h-12 w-12 rounded-xl object-cover" style={{ borderRadius: '12px' }} />
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <span className="truncate text-[16px] font-medium text-[#212121]">{name}</span>
      </div>
      <div className="ml-2 flex items-center gap-2">
        <span className="text-[16px] font-medium text-[#212121]">₹{price}</span>
        {quantity > 0 ? (
          <div
            style={{
              width: 92,
              height: 32,
              borderRadius: 8,
              padding: '4px 10px',
              background: '#38963B',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              opacity: 1
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
                justifyContent: 'center'
              }}
              onClick={() => onQuantityChange(id, quantity - 1)}
              disabled={quantity === 0 || disabled}
            >
              {/* Minus icon */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="8.25" width="10" height="1.5" rx="0.75" fill="white" />
              </svg>
            </button>
            <span style={{ width: 24, textAlign: 'center', color: '#fff', fontWeight: 500 }}>{quantity}</span>
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
                justifyContent: 'center'
              }}
              onClick={() => onQuantityChange(id, quantity + 1)}
              disabled={disabled}
            >
              {/* Plus icon */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8.25" y="4" width="1.5" height="10" rx="0.75" fill="white" />
                <rect x="4" y="8.25" width="10" height="1.5" rx="0.75" fill="white" />
              </svg>
            </button>
          </div>
        ) : (
          <button
            style={{
              minWidth: 56,
              minHeight: 32,
              borderRadius: 12,
              background: '#fff',
              color: '#38963B',
              fontWeight: 500,
              fontSize: 16,
              border: '1px solid #38963B',
              padding: '0 20px',
              cursor: 'pointer',
              transition: 'background 0.2s',
              opacity: disabled ? 0.5 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'none'
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = '#E9FFE5')}
            onMouseOut={(e) => (e.currentTarget.style.background = '#fff')}
            onClick={() => onAdd(id)}
            disabled={disabled}
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default SimpleSideItemCard;
