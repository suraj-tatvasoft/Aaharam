import React from "react";
import PageLayout from "@/components/PageLayout";

const notifications = [
    {
        title: "Your Bulk Pass is Activated",
        message: "Enjoy daily meals without any hassle!",
        time: "20 min ago",
        unread: true,
    },
    {
        title: "Your Token #5629 is Ready",
        message: "It's your turn—please collect your meal.",
        time: "12h ago",
        unread: false,
    },
    {
        title: "Feedback Acknowledged",
        message: "Your feedback has been acknowledged.",
        time: "12h ago",
        unread: false,
    },
    {
        title: "Bulk Pass Expired",
        message: "Your meal access has ended. Renew now to conti...",
        time: "16h ago",
        unread: false,
    },
    {
        title: "Your Bulk Pass is Expiring Soon",
        message: "Renew now to continue enjoying seamless access...",
        time: "16h ago",
        unread: false,
    },
];

const Notifications: React.FC = () => {
    return (
        <PageLayout title="Notifications">
            <div className="flex-1 bg-[#F7F7F7] flex flex-col items-center pt-4 px-2">
                <div className="w-full max-w-md flex flex-col gap-3">
                    {notifications.map((n, i) => (
                        <div
                            key={i}
                            className={`rounded-2xl bg-white px-5 py-4 flex flex-col gap-1 shadow-sm ${i === 0 ? 'border-2 border-[#F4F4F4]' : ''}`}
                        >
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-[17px] text-[#222]">{n.title}</span>
                                {n.unread && <span className="ml-1 w-2 h-2 rounded-full bg-[#FF9100] inline-block" />}
                            </div>
                            <span className="text-[15px] text-[#6B6B6B] font-normal leading-snug">{n.message}</span>
                            <span className="text-xs text-[#8B8B8B] mt-1 flex items-center gap-1">
                                {n.unread && <span className="w-2 h-2 rounded-full bg-[#FF9100] inline-block" />} {n.time}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </PageLayout>
    );
};

export default Notifications;
