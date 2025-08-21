import React, { useState, useEffect } from 'react';

// Animated Number Component
const AnimatedNumber = ({ value, direction }: { value: number; direction?: 'up' | 'down' }) => {
  return (
    <div className="relative w-6 h-[28px] overflow-hidden">
      <div
        key={`${value}-${direction}`}
        className={`absolute inset-0 flex items-center justify-center text-center font-medium text-white transition-transform duration-200 ease-out ${
          direction === 'down' ? 'animate-in slide-in-from-top' : 'animate-in slide-in-from-bottom'
        }`}
      >
        {value}
      </div>
    </div>
  );
};

interface SimpleSideItemCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  onAdd: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
  disabled?: boolean;
  ItemType?: string;
}

const SimpleSideItemCard: React.FC<SimpleSideItemCardProps> = ({
  ItemType,
  id,
  name,
  price,
  image,
  quantity,
  onAdd,
  onQuantityChange,
  disabled = false,
}) => {
  const [prevQuantity, setPrevQuantity] = useState(quantity);
  const [direction, setDirection] = useState<'up' | 'down'>('up');

  useEffect(() => {
    if (quantity !== prevQuantity) {
      setDirection(quantity > prevQuantity ? 'up' : 'down');
      setPrevQuantity(quantity);
    }
  }, [quantity, prevQuantity]);

  const isSlides = ItemType === 'slides';
  return (
    <div
      style={{
        borderRadius: '10px',
        padding: isSlides ? '3px 12px 3px 4px' : '3px 16px 3px 4px',
      }}
      className={`flex items-center bg-white`}
    >
      <img
        src={image}
        alt={name}
        className="mr-3rounded-xl object-cover"
        style={{
          borderRadius: '6px',
          width: isSlides ? '66px' : '46px',
          height: isSlides ? '66px' : '46px',
          margin: '0 10px 0 0',
          backgroundColor: '#DEE7EF',
        }}
      />
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <span className="truncate text-[16px] font-normal leading-[16px] text-[#212121]">{name}</span>
      </div>
      <div className="ml-2 flex items-center gap-[10px]">
        <span className="text-[14px] font-normal leading-[14px] text-[#212121]">₹{price}</span>
        {quantity > 0 ? (
          <div
            style={{
              width: 92,
              height: 30,
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
              onClick={() => onQuantityChange(id, quantity - 1)}
              disabled={quantity === 0 || disabled}
            >
              {/* Minus icon */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="8.25" width="10" height="1.5" rx="0.75" fill="white" />
              </svg>
            </button>
            <AnimatedNumber value={quantity} direction={direction} />
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
            className={`flex min-h-[30px] min-w-[50px] items-center justify-center rounded-lg bg-white hover:text-white text-sm font-medium transition-all duration-200 ${disabled ? 'cursor-not-allowed border border-[#A3A3A3] text-[#A3A3A3] opacity-50' : 'cursor-pointer border border-[#38963B] text-[#38963B]'}`}
            onMouseOver={(e) => (e.currentTarget.style.background = '#38963B')}
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
