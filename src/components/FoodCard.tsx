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
  onQuantityChange
}: FoodCardProps) => {
  return (
    <Card
      className={`overflow-hidden rounded-[16px] border-border/50 bg-card transition-shadow hover:shadow-sm ${!available ? 'pointer-events-none opacity-90' : ''}`}
    >
      <div className="flex p-1">
        {/* Food Image */}
        <div className="h-[100px] w-[100px] flex-shrink-0 overflow-hidden rounded-[12px]">
          <img src={image} alt={name} className={`h-full w-full object-cover transition-all ${!available ? 'opacity-90 grayscale' : ''}`} />
        </div>
        {/* Food Details */}
        <div className="flex flex-1 flex-col justify-between p-[10px]">
          <div className="flex justify-between">
            <div className="min-w-0 flex-1">
              <h3
                className="line-clamp-1"
                style={{
                  fontFamily: 'Outfit',
                  fontWeight: 500,
                  fontStyle: 'normal',
                  fontSize: 16,
                  lineHeight: '100%',
                  letterSpacing: 0,
                  color: 'var(--card-foreground)'
                }}
              >
                {name}
              </h3>
              {description && (
                <p
                  className="mt-2 line-clamp-2"
                  style={{
                    fontFamily: 'Outfit',
                    fontWeight: 300,
                    fontStyle: 'normal',
                    fontSize: 12,
                    lineHeight: '100%',
                    letterSpacing: 0,
                    color: '#797979'
                  }}
                >
                  {description}
                </p>
              )}
            </div>
            {/* Favorite Button - absolutely positioned top right */}
            <button
              type="button"
              onClick={() => onToggleFavorite(id)}
              className="z-10 flex h-[22px] w-[22px] items-center justify-center p-0 text-muted-foreground hover:bg-transparent hover:text-destructive"
            >
              <Heart width={22} height={22} className={`${isFavorite ? 'fill-destructive text-destructive' : ''}`} />
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
                color: 'var(--card-foreground)'
              }}
            >
              ₹{price}
            </span>
            {quantity > 0 && onQuantityChange ? (
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
                >
                  <Minus size={18} color="#fff" />
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
                >
                  <Plus size={18} color="#fff" />
                </button>
              </div>
            ) : (
              <button
                style={{
                  minWidth: 56,
                  minHeight: 32,
                  borderRadius: 12,
                  background: '#fff',
                  color: available ? '#38963B' : '#A3A3A3',
                  fontWeight: 500,
                  fontSize: 16,
                  border: available ? '1px solid #38963B' : '1px solid #A3A3A3',
                  padding: '0 20px',
                  cursor: available ? 'pointer' : 'not-allowed',
                  transition: 'background 0.2s',
                  opacity: available ? 1 : 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'none'
                }}
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
