import React from 'react';
import PageLayout from '@/components/PageLayout';

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
  return (
    <PageLayout title="Notifications">
      <div className="flex w-full flex-1 flex-col items-center p-4">
        <div className="flex w-full max-w-full flex-col items-center gap-4">
          {notifications.map((n, i) => (
            <div
              key={i}
              className="flex min-h-[89px] w-full flex-col items-center gap-4 rounded-[16px] bg-white px-4 py-4 shadow-[0_0_20px_0px_#F25D460D]"
            >
              <div className="flex w-full flex-col gap-3">
                <span className="font-outfit text-[16px] font-medium leading-[20px] text-[#212121]">{n.title}</span>
                <span className="font-outfit truncate text-[14px] font-normal leading-[10px] text-[#4D4D4D]">{n.message}</span>
              </div>

              <div className="flex w-full flex-row items-center gap-1">
                {n.unread && <span className="inline-block h-[6px] w-[6px] rounded-full bg-[#FF8025]" />}
                <span className="font-outfit text-[12px] font-light leading-[8px] text-[#494949]">{n.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Notifications;
