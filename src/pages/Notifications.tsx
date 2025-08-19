import React from 'react';
import PageLayout from '@/components/PageLayout';
import markAllIcon from '@/assets/mark-all-icon.svg';
import markIcon from '@/assets/mark-read-icon.svg';

const notifications = [
  {
    title: 'Your Bulk Pass is Activated',
    message: 'Enjoy daily meals without any hassle!',
    time: '20 min ago',
    unread: true,
  },
  {
    title: 'Your Token #5629 is Ready',
    message: "It's your turn—please collect your meal.",
    time: '12h ago',
    unread: false,
  },
  {
    title: 'Feedback Acknowledged',
    message: 'Your feedback has been acknowledged.',
    time: '12h ago',
    unread: false,
  },
  {
    title: 'Bulk Pass Expired',
    message: 'Your meal access has ended. Renew now to continue enjoying seamless access.',
    time: '16h ago',
    unread: false,
  },
  {
    title: 'Your Bulk Pass is Expiring Soon',
    message: 'Renew now to continue enjoying seamless access...',
    time: '16h ago',
    unread: false,
  },
];

const Notifications: React.FC = () => {
  const handleMarkAllAsRead = () => {
    // TODO: Implement mark all as read functionality
    console.log('Mark all as read clicked');
  };

  const markAllAsReadButton = (
    <button
      onClick={handleMarkAllAsRead}
      className="flex items-center gap-2 text-[14px] text-[#38963B] hover:underline"
    >
      <img src={markAllIcon} alt="Mark as read" className="w-4 h-4" style={{ position: 'relative', top: '-1px' }} />
      Mark All as Read
    </button>
  );

  return (
    <PageLayout title="Notifications" rightAction={markAllAsReadButton}>
      <div className="flex w-full flex-1 flex-col items-center p-4">
        <div className="flex w-full max-w-full flex-col items-center gap-4">
          {notifications.map((n, i) => (
            <div
              key={i}
              className={`flex min-h-[89px] w-full flex-col items-center gap-4 rounded-[16px] px-4 py-4 shadow-[0_0_20px_0px_#F25D460D] ${n.unread ? 'bg-white' : 'bg-white'}`}
            >
              <div className="flex w-full flex-col gap-3">
                <span className="text-[16px] font-medium leading-[20px] text-[#212121]">{n.title}</span>
                <span className="text-[14px] font-normal leading-normal text-[#4D4D4D]">{n.message}</span>
              </div>
              <div className="flex w-full flex-1 items-center justify-between">
                <div className="flex items-center gap-1">
                  
                  <span className="text-[12px] font-light leading-[8px]" style={{ color: 'rgba(33, 33, 33, 0.6)' }}>{n.time}</span>
                  {n.unread && <span className="inline-block h-[6px] w-[6px] rounded-full bg-[#38963B]" />}
                </div>
                <button className="flex items-center gap-1 text-[12px] font-light leading-[8px] text-[#38963B] hover:underline">
                <img src={markIcon} alt="Mark as read" className="w-4 h-4" /> Mark as Read
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Notifications;
