import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import breakfastIcon from "@/assets/breakfast.svg";
import lunchIcon from "@/assets/lunch.svg";
import eveningSnacksIcon from "@/assets/evening-snacks.svg";
import sidesIcon from "@/assets/sides.svg";

const categories = [
  {
    id: "breakfast",
    name: "Breakfast",
    icon: breakfastIcon,
    description: "Delicious morning options",
  },
  {
    id: "lunch",
    name: "Lunch",
    icon: lunchIcon,
    description: "Hearty midday meals",
  },
  {
    id: "evening-snacks",
    name: "Evening Snacks",
    icon: eveningSnacksIcon,
    description: "Light bites for evening",
  },
  {
    id: "sides",
    name: "Sides",
    icon: sidesIcon,
    description: "Perfect accompaniments",
  },
];

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs = ({
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) => {
  return (
    <TooltipProvider>
      <div className=" bg-background">
        {/* Category Tabs */}
        <div className="flex justify-between">
          {categories.map((category) => (
            <Tooltip key={category.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onCategoryChange(category.id)}
                  className={cn(
                    "flex flex-col items-center gap-1 py-2 px-2 transition-all min-w-0 flex-1",
                    activeCategory === category.id
                      ? "text-primary border-b-2 border-green-500"
                      : "text-muted-foreground border-b-2 border-transparent"
                  )}
                >
                  <img
                    src={category.icon}
                    alt={category.name + " icon"}
                    className="object-contain"
                  />
                  <span className="text-xs font-medium md:text-sm truncate">
                    {category.name}
                  </span>
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
