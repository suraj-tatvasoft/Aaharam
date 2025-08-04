import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const PromoBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="h-8 px-4 flex items-center justify-between" style={{ backgroundColor: '#ADE2A5' }}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-foreground">
          Buy Bulk Meal Pass on Discounted Rates
        </span>
        <ArrowRight className="w-4 h-4 text-foreground" />
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-foreground h-8 w-8 p-0 focus:outline-none hover:bg-transparent"
        onClick={() => setIsVisible(false)}
      >
        <X className="w-4 h-4 text-foreground hover:bg-transparent" />
      </Button>
    </div>
  );
};

export default PromoBar;