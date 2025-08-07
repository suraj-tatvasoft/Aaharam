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
            <div className="flex-1 flex w-full flex-col items-center p-4">
                <div className="w-full max-w-full flex flex-col gap-4 items-center">
                    {notifications.map((n, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center px-4 py-4 gap-2 bg-white rounded-[16px] shadow-[0_0_20px_rgba(242,93,70,0.05)] w-full min-h-[89px]"
                        >
                            <div className="w-full flex flex-col gap-1">
                                <span className="font-outfit font-medium text-[16px] leading-[20px] text-[#212121]">{n.title}</span>
                                <span className="font-outfit font-normal text-[14px] leading-[18px] text-[#4D4D4D]">{n.message}</span>
                            </div>
                            <div className="w-full flex flex-row items-center gap-1 mt-2">
                                {n.unread && <span className="w-[6px] h-[6px] rounded-full bg-[#FF8025] inline-block" />}
                                <span className="font-outfit font-light text-[12px] leading-[15px] text-[#494949]">{n.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PageLayout>
    );
};

export default Notifications;
