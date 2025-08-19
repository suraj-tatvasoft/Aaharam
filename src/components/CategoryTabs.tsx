import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState, useEffect } from 'react';

import breakfastIcon from '@/assets/breakfast.svg';
import lunchIcon from '@/assets/lunch.svg';
import eveningSnacksIcon from '@/assets/evening-snacks.svg';
import sidesIcon from '@/assets/sides.svg';

const categories = [
  {
    id: 'breakfast',
    name: 'Breakfast',
    icon: breakfastIcon,
    description: 'Delicious morning options',
  },
  {
    id: 'lunch',
    name: 'Lunch',
    icon: lunchIcon,
    description: 'Hearty midday meals',
  },
  {
    id: 'evening-snacks',
    name: 'Snacks',
    icon: eveningSnacksIcon,
    description: 'Light bites for evening',
  },
  {
    id: 'sides',
    name: 'Sides',
    icon: sidesIcon,
    description: 'Perfect accompaniments',
  },
];

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs = ({ activeCategory, onCategoryChange }: CategoryTabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const index = categories.findIndex(cat => cat.id === activeCategory);
    setActiveIndex(index);
  }, [activeCategory]);

  return (
    <TooltipProvider>
      <div className="bg-background relative">
        {/* Category Tabs */}
        <div className="flex justify-between relative">
          {/* Animated underline indicator */}
          <div 
            className="absolute bottom-0 h-[2px] bg-[#38963B] transition-all duration-300 ease-out"
            style={{
              width: `${100 / categories.length}%`,
              left: `${(activeIndex * 100) / categories.length}%`,
            }}
          />
          
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                'flex min-w-0 flex-1 flex-col items-center gap-1 px-2 pb-[11px] pt-2 text-[#212121] transition-all duration-300 ease-out transform relative z-10',
                activeCategory === category.id 
                  ? 'font-medium text-[#212121]' 
                  : 'font-normal hover:text-[#212121]',
              )}
            >
              <div className={cn(
                'transition-all duration-300 ease-out',
                activeCategory === category.id ? 'scale-100' : 'scale-100'
              )}>
                <img 
                  src={category.icon} 
                  alt={category.name + ' icon'}
                  height="36px" 
                  width="57px" 
                  className={cn(
                    "object-contain transition-all duration-300 ease-out"
                  )} 
                />
              </div>
              <span className={cn(
                "truncate text-[14px] md:text-sm transition-all duration-300 ease-out",
                activeCategory === category.id ? 'font-medium' : ''
              )}>
                {category.name}
              </span>
            </button>
          ))}
          
          {/* Background border for inactive tabs */}
          <div className="absolute bottom-0 w-full h-[2px] bg-[#2121211A]" />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CategoryTabs;
