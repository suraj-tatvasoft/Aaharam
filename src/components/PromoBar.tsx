import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PromoBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  if (!isVisible) return null;

  return (
    <div className="h-8 px-4 flex items-center justify-between" style={{ backgroundColor: '#ADE2A5' }}>
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate('/bulk-pass')}
        role="button"
        tabIndex={0}
        onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') navigate('/bulk-pass'); }}
      >
        <span className="text-xs font-normal text-[#212121]">
          Buy Bulk Meal Pass on Discounted Rates
        </span>
        <ArrowRight className="w-4 h-4 text-[#212121]" />
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="text-[#212121] h-8 w-8 p-0 focus:outline-none hover:bg-transparent"
        onClick={() => setIsVisible(false)}
      >
        <X className="w-4 h-4 text-[#212121] hover:bg-transparent" />
      </Button>
    </div>
  );
};

export default PromoBar;