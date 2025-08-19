import { Heart, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState, useEffect } from 'react';


interface FoodCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  available?: boolean;
  unavailableReason?: string;
  onAdd: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  isFavorite?: boolean;
  quantity?: number;
  onQuantityChange?: (id: string, quantity: number) => void;
}

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

const FoodCard = ({
  id,
  name,
  price,
  image,
  description,
  available = true,
  unavailableReason,
  onAdd,
  onToggleFavorite,
  isFavorite = false,
  quantity = 0,
  onQuantityChange,
}: FoodCardProps) => {
  const [prevQuantity, setPrevQuantity] = useState(quantity);
  const [direction, setDirection] = useState<'up' | 'down'>('up');

  useEffect(() => {
    if (quantity !== prevQuantity) {
      setDirection(quantity > prevQuantity ? 'up' : 'down');
      setPrevQuantity(quantity);
    }
  }, [quantity, prevQuantity]);
  return (
    <Card
      style={{ boxShadow: '0px 0px 20px 0px #F25D460D' }}
      className={`overflow-hidden rounded-[16px] border-border/50 bg-card ${!available ? 'pointer-events-none opacity-90' : ''}`}
    >
      <div className="flex p-1">
        {/* Food Image */}
        <div className="h-[110px] w-[110px] flex-shrink-0 overflow-hidden rounded-[12px]">
          <img src={image} alt={name} height="100%" width="100%" className={`h-full w-full object-cover transition-all ${!available ? 'opacity-90 grayscale' : ''}`} />
        </div>
        {/* Food Details */}
        <div className="flex flex-1 flex-col justify-between py-[5px] px-[10px]">
          <div className="flex justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="font-outfit line-clamp-1 text-[16px] font-normal leading-[16px] tracking-normal text-[#212121]">{name}</h3>
              {description && (
                <p className="font-outfit mt-2 line-clamp-2 text-[12px] font-light leading-normal tracking-normal text-[#797979]">{description}</p>
              )}
            </div>
            {/* Favorite Button - absolutely positioned top right */}
            <button
              type="button"
              onClick={() => onToggleFavorite(id)}
              className="z-10 flex h-[18px] w-[18px] items-center justify-center p-0 text-muted-foreground hover:bg-transparent hover:text-destructive"
            >
              <Heart width={18} height={18} className={`${isFavorite ? 'fill-destructive text-destructive' : ''}`} />
            </button>
          </div>
          {/* Price and Add button row */}
          <div className="mt-1 flex items-end justify-between">
            <span
              style={{
                fontFamily: 'Outfit',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: 14,
                lineHeight: '100%',
                letterSpacing: 0,
                color: 'var(--card-foreground)',
              }}
            >
              ₹{price}
            </span>
            {quantity > 0 && onQuantityChange ? (
              <div className="flex h-[30px] w-[92px] items-center gap-1.5 rounded-lg bg-[#38963B] px-2.5 py-1">
                <button
                  className="flex h-[22px] w-[22px] cursor-pointer items-center justify-center border-none bg-none text-lg text-white"
                  onClick={() => onQuantityChange(id, quantity - 1)}
                >
                  <Minus size={18} className="text-white" />
                </button>
                <AnimatedNumber value={quantity} direction={direction} />
                <button
                  className="flex h-[22px] w-[22px] cursor-pointer items-center justify-center border-none bg-none text-lg text-white"
                  onClick={() => onQuantityChange(id, quantity + 1)}
                >
                  <Plus size={18} className="text-white" />
                </button>
              </div>
            ) : (
              <button
                className={`flex min-h-[30px] min-w-[50px] items-center justify-center rounded-lg bg-white text-sm font-medium ${available ? 'cursor-pointer border border-[#38963B] hover:text-white hover:bg-[#38963B] text-[#38963B]' : 'cursor-not-allowed border border-[#A3A3A3] text-[#A3A3A3] opacity-50'}`}
                onClick={() => available && onAdd(id)}
              >
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FoodCard;
