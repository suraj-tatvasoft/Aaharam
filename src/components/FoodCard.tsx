import { Heart, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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
  return (
    <Card
      className={`overflow-hidden rounded-[16px] border-border/50 bg-card transition-shadow hover:shadow-sm ${!available ? 'pointer-events-none opacity-90' : ''}`}
    >
      <div className="flex items-center p-1">
        {/* Food Image */}
        <div className="h-[100px] w-[100px] flex-shrink-0 overflow-hidden rounded-[12px]">
          <img src={image} alt={name} className={`h-full w-full object-cover transition-all ${!available ? 'opacity-90 grayscale' : ''}`} />
        </div>
        {/* Food Details */}
        <div className="flex flex-1 flex-col justify-between p-[10px]" style={{ minHeight: '-webkit-fill-available' }}>
          <div className="flex justify-between">
            <div className="min-w-0 flex-1">
              <h3
                className="line-clamp-1 font-outfit font-normal text-[16px] leading-[16px] tracking-normal text-[#212121]"
              >
                {name}
              </h3>
              {description && (
                <p
                  className="mt-3 line-clamp-2 font-outfit font-light text-[12px] leading-[12px] tracking-normal text-[#797979]"
                >
                  {description}
                </p>
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
          <div className="mt-2 flex items-end justify-between">
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
              <div className="w-[92px] h-8 rounded-lg px-2.5 py-1 bg-[#38963B] flex items-center gap-1.5">
                <button
                  className="text-white text-lg w-[22px] h-[22px] border-none bg-none cursor-pointer flex items-center justify-center"
                  onClick={() => onQuantityChange(id, quantity - 1)}
                >
                  <Minus size={18} className="text-white" />
                </button>
                <span className="w-6 text-center text-white font-medium">{quantity}</span>
                <button
                  className="text-white text-lg w-[22px] h-[22px] border-none bg-none cursor-pointer flex items-center justify-center"
                  onClick={() => onQuantityChange(id, quantity + 1)}
                >
                  <Plus size={18} className="text-white" />
                </button>
              </div>
            ) : (
              <button
                className={`min-w-[50px] min-h-[30px] rounded-lg bg-white font-medium text-sm flex items-center justify-center transition-all duration-200 ${available ? 'text-[#38963B] border border-[#38963B] cursor-pointer' : 'text-[#A3A3A3] border border-[#A3A3A3] cursor-not-allowed opacity-50'}`}
                onMouseOver={(e) => {
                  if (available) e.currentTarget.style.background = '#E9FFE5';
                }}
                onMouseOut={(e) => {
                  if (available) e.currentTarget.style.background = '#fff';
                }}
                onClick={() => available && onAdd(id)}
                // disabled={!available}
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
