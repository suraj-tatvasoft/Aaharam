import { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const PromoBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  if (!isVisible) return null;

  return (
    <div className="flex h-8 items-center justify-between px-4" style={{ backgroundColor: '#ADE2A5' }}>
      <div
        className="flex cursor-pointer items-center gap-2"
        onClick={() => navigate('/bulk-pass')}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') navigate('/bulk-pass');
        }}
      >
        <span className="text-xs font-normal text-[#212121]">Buy Bulk Meal Pass on Discounted Rates</span>
        <ArrowRight className="h-4 w-4 text-[#212121]" />
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 text-[#212121] hover:bg-transparent focus:outline-none"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4 text-[#212121] hover:bg-transparent" />
      </Button>
    </div>
  );
};

export default PromoBar;
