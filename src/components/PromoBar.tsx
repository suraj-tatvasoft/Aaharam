import { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import NotificationModal from '@/components/modals/NotificationModal';

const PromoBar = () => {
  const navigate = useNavigate();

  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  return (
    <div className="flex h-8 items-center justify-between py-4 pl-4" style={{ backgroundColor: '#ADE2A5' }}>
      <div className="flex cursor-pointer items-center gap-2" role="button" tabIndex={0}>
        <span className="text-xs font-normal text-[#212121]">Buy Bulk Meal Pass on Discounted Rates</span>
        <ArrowRight className="h-4 w-4 text-[#212121]" />
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 text-[#212121] hover:bg-transparent focus:outline-none"
        onClick={() => setIsNotificationModalOpen(true)}
      >
        <X className="h-4 w-4 text-[#212121] hover:bg-transparent" />
      </Button>
      <NotificationModal isOpen={isNotificationModalOpen} onClose={() => setIsNotificationModalOpen(false)} />
    </div>
  );
};

export default PromoBar;
