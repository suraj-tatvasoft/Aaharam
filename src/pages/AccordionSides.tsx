import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import FoodCard from '@/components/FoodCard';
import SimpleSideItemCard from './SimpleSideItemCard';

interface ModifierOption {
  id: string;
  name: string;
  price: number;
}

interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  available?: boolean;
  unavailableReason?: string;
  availableFor?: string[];
  modifiers?: ModifierOption[];
  sideTitle?: string;
}

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

interface AccordionSidesProps {
  items: FoodItem[];
  onAddItem: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  favorites: Set<string>;
  cart: { [id: string]: CartItem };
  onQuantityChange: (id: string, quantity: number) => void;
}

const AccordionSides: React.FC<AccordionSidesProps> = ({ items, onAddItem, onToggleFavorite, favorites, cart, onQuantityChange }) => {
  // Group items by sideTitle
  const groups = items.reduce((acc: Record<string, FoodItem[]>, item) => {
    const group = item.sideTitle || 'Other';
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});

  const groupOrder = ['Packaged Foods', 'Beverages', 'Sweets/Chocolates'];
  const sortedGroups = groupOrder.filter((title) => groups[title]).concat(Object.keys(groups).filter((title) => !groupOrder.includes(title)));

  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="flex flex-col">
      {sortedGroups.map((group) => (
        <div key={group}>
          {/* Accordion Header */}
          <button
            className="py-5 px-4 flex w-full items-center justify-between text-left focus:outline-none"
            onClick={() => setOpen(open === group ? null : group)}
          >
            <span className="text-[16px] font-normal text-[#212121]">{group}</span>
            <ChevronDown size={16} className={`transition-transform duration-200 ${open === group ? 'rotate-180' : ''}`} />
          </button>
          {/* 4px white divider */}
          {open !== group && <div className="w-full h-[4px] bg-white" />}
          {/* Accordion Content */}
          {open === group && (
            <div className="flex flex-col gap-4 px-4">
              {groups[group].map((item, idx) => (
                <div key={item.id}>
                  <SimpleSideItemCard
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    quantity={cart[item.id]?.quantity || 0}
                    onAdd={onAddItem}
                    onQuantityChange={onQuantityChange}
                    ItemType="slides"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AccordionSides;
