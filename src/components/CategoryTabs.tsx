import { useState } from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const categories = [
  { id: "breakfast", name: "Breakfast", emoji: "🥐", description: "Delicious morning options" },
  { id: "lunch", name: "Lunch", emoji: "🍛", description: "Hearty midday meals" },
  { id: "evening-snacks", name: "Evening Snacks", emoji: "🥪", description: "Light bites for evening" },
  { id: "sides", name: "Sides", emoji: "🍟", description: "Perfect accompaniments" },
];

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs = ({ activeCategory, onCategoryChange }: CategoryTabsProps) => {
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
                    "flex flex-col items-center gap-1 py-2 px-2 rounded-lg transition-all min-w-0 flex-1",
                    "hover:bg-muted/50",
                    activeCategory === category.id
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-lg md:w-12 md:h-12 md:text-xl">
                    {category.emoji}
                  </div>
                  <span className="text-xs font-medium md:text-sm truncate">{category.name}</span>
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