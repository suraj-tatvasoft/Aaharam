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
            <Tooltip key={category.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onCategoryChange(category.id)}
                  className={cn(
                    'flex min-w-0 flex-1 flex-col items-center gap-1 px-2 py-2 transition-all',
                    activeCategory === category.id
                      ? 'border-b-2 border-green-500 text-primary'
                      : 'border-b-2 border-transparent text-muted-foreground',
                  )}
                >
                  <img src={category.icon} alt={category.name + ' icon'} className="object-contain" />
                  <span className="truncate text-xs font-medium md:text-sm">{category.name}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{category.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CategoryTabs;
