import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
    name: 'Evening Snacks',
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
  return (
    <TooltipProvider>
      <div className="bg-background">
        {/* Category Tabs */}
        <div className="flex justify-between">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                'flex min-w-0 flex-1 flex-col items-center gap-1 px-2 pb-[11px] pt-2 text-[#212121] transition-all',
                activeCategory === category.id ? 'border-b-2 border-[#38963B] font-medium' : 'border-b-2 border-[#2121211A] font-normal',
              )}
            >
              <img src={category.icon} alt={category.name + ' icon'} className="object-contain" />
              <span className="truncate text-[14px] md:text-sm">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CategoryTabs;
