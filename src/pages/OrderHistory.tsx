import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profileBack from '@/assets/profile-back.svg';
import Container from '@/components/Container';
import EmptyState from '@/components/EmptyState';
import { CheckCircle2, XCircle, EyeOff, Ban } from 'lucide-react';
import profileAccordion from '@/assets/profile-accordion.svg';

const TABS = [
  { label: 'Completed'},
  { label: 'Rejected'},
  { label: 'No Show'},
  { label: 'Cancelled'},
];

export const ORDERS = [
  { id: 27211, amount: 110, date: '18th Apr 25', status: 'Completed' },
  { id: 12545, amount: 200, date: '18th Apr 25', status: 'Completed' },
  { id: 27212, amount: 110, date: '18th Apr 25', status: 'Completed' },
  { id: 12546, amount: 200, date: '18th Apr 25', status: 'Completed' },
  { id: 27213, amount: 110, date: '18th Apr 25', status: 'Completed' },
  { id: 12547, amount: 200, date: '18th Apr 25', status: 'Completed' },
  { id: 45575, amount: 10, date: '18th Apr 25', status: 'Rejected' },
  { id: 78451, amount: 400, date: '18th Apr 25', status: 'Completed' },
  // { id: 45523, amount: 300, date: '18th Apr 25', status: 'No Show' },
  { id: 45878, amount: 200, date: '18th Apr 25', status: 'Completed' },
  { id: 27211, amount: 110, date: '18th Apr 25', status: 'Completed' },
  { id: 27220, amount: 110, date: '18th Apr 25', status: 'Cancelled' },
  { id: 27213, amount: 110, date: '18th Apr 25', status: 'Completed' },
  { id: 27214, amount: 110, date: '18th Apr 25', status: 'Completed' },
  // { id: 27215, amount: 110, date: '18th Apr 25', status: 'No Show' },
  { id: 27216, amount: 110, date: '18th Apr 25', status: 'Rejected' },
];

const OrderHistory: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  const handleTabChange = (newTabIndex: number) => {
    if (newTabIndex === activeTab || isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveTab(newTabIndex);
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const updateIndicatorPosition = () => {
    const activeTabElement = tabRefs.current[activeTab];
    if (activeTabElement) {
      const tabContainer = activeTabElement.parentElement;
      if (tabContainer) {
        const containerRect = tabContainer.getBoundingClientRect();
        const tabRect = activeTabElement.getBoundingClientRect();
        
        setIndicatorStyle({
          width: tabRect.width,
          left: tabRect.left - containerRect.left,
        });
      }
    }
  };

  React.useEffect(() => {
    if (tabRefs.current[activeTab]) {
      tabRefs.current[activeTab]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
      
      // Update indicator position after scroll
      setTimeout(() => {
        updateIndicatorPosition();
      }, 100);
    }
  }, [activeTab]);

  React.useEffect(() => {
    updateIndicatorPosition();
    
    const handleResize = () => {
      updateIndicatorPosition();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);

  return (
    <Container>
      <div className="flex flex-1 flex-col overflow-hidden bg-[#F7F7F7]">
        <div>
          <div className="flex items-center bg-[#FFFFFF] px-4 pb-4 pt-4">
            <button className="mr-2 flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#E9FFE5]" onClick={() => navigate(-1)}>
              <img src={profileBack} alt="Back" className="h-4 w-4" />
            </button>
            <span className="text-lg font-normal text-[#212121]">Order History</span>
          </div>

          <div className="bg-[#FFFFFF] relative">
            {/* Background border for inactive tabs - moved outside scrollable container */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2121211A] z-0" />
            
            <div className="relative scrollbar-hide w-full overflow-x-auto">
              <div className="flex min-w-max">
                {/* Animated underline indicator */}
                <div 
                  className="absolute bottom-0 h-[2px] bg-[#38963B] transition-all duration-300 ease-out z-10"
                  style={{
                    width: `${indicatorStyle.width}px`,
                    left: `${indicatorStyle.left}px`,
                  }}
                />
                
                {TABS.map((tab, idx) => {
                  return (
                    <button
                      key={tab.label}
                      ref={(el) => (tabRefs.current[idx] = el)}
                      onClick={() => handleTabChange(idx)}
                      className="flex min-w-[80px] flex-shrink-0 flex-col items-center gap-1 px-4 pb-[11px] pt-2 text-[#212121] transition-all duration-300 ease-out transform relative z-20"
                    >
                      <span className={`whitespace-nowrap text-[14px] transition-all duration-300 ease-out ${
                        activeTab === idx ? 'font-medium text-[#212121]' : 'font-normal text-[#212121]'
                      }`}>
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Panels with Slider Effect */}
        <div className="relative w-full flex-1 overflow-hidden bg-[#F7F7F7]">
          <div 
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${activeTab * 100}%)`,
              width: '100%'
            }}
          >
            {TABS.map((tab, tabIndex) => {
              const filteredOrders = ORDERS.filter((order) => order.status === tab.label);
              const tabIconMap = {
                Completed: <CheckCircle2 className="mb-2 h-12 w-12 text-green-400" />,
                Rejected: <XCircle className="mb-2 h-12 w-12 text-red-400" />,
                'No Show': <EyeOff className="mb-2 h-12 w-12 text-gray-400" />,
                Cancelled: <Ban className="mb-2 h-12 w-12 text-yellow-400" />,
              };
              
              return (
                <div 
                  key={tab.label}
                  className="h-full flex-shrink-0"
                  style={{ 
                    width: '100%',
                    padding: '16px' 
                  }}
                >
                  <div className="scrollbar-hide h-full space-y-4 overflow-y-auto">
                    {filteredOrders.length === 0 ? (
                      <div className="h-full">
                        <EmptyState
                          title={`No ${tab.label} Orders`}
                          description={`You have no ${tab.label.toLowerCase()} orders yet.`}
                          icon={tabIconMap[tab.label as keyof typeof tabIconMap]}
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col justify-between space-y-4 h-full">
                        <div className="space-y-4">
                          {filteredOrders.map((order, i) => (
                            <div
                              key={i}
                              className="mb-3 flex cursor-pointer items-center justify-between rounded-[16px] bg-[#FFFFFF] p-4 shadow-[0_0_20px_0_#F25D460D]"
                              onClick={() => navigate(`/order-history/${order.id}`)}
                            >
                              <div className="flex flex-col gap-2">
                                <div className="text-base font-medium text-[#212121]">Order #{order.id}</div>
                                <div className="text-[14px] font-medium text-[#212121]">₹{order.amount}</div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <span className="text-[14px] font-light text-[#212121]">{order.date}</span>
                                <img src={profileAccordion} alt="Expand" className="h-[10px] w-[5px]" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OrderHistory;
