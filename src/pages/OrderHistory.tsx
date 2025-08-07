import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import profileBack from "@/assets/profile-back.svg";
import Container from "@/components/Container";

const TABS = [
  { label: "Completed", count: 78 },
  { label: "Rejected", count: 4 },
  { label: "No Show", count: 3 },
  { label: "Cancelled", count: 1 },
];

export const ORDERS = [
  { id: 27211, amount: 110, date: "18th Apr 25", status: "Completed" },
  { id: 12545, amount: 200, date: "18th Apr 25", status: "Completed" },
  { id: 27212, amount: 110, date: "18th Apr 25", status: "Completed" },
  { id: 12546, amount: 200, date: "18th Apr 25", status: "Completed" },
  { id: 27213, amount: 110, date: "18th Apr 25", status: "Completed" },
  { id: 12547, amount: 200, date: "18th Apr 25", status: "Completed" },
  { id: 45575, amount: 10, date: "18th Apr 25", status: "Rejected" },
  { id: 78451, amount: 400, date: "18th Apr 25", status: "Completed" },
  { id: 45523, amount: 300, date: "18th Apr 25", status: "No Show" },
  { id: 45878, amount: 200, date: "18th Apr 25", status: "Completed" },
  { id: 27211, amount: 110, date: "18th Apr 25", status: "Completed" },
  { id: 27220, amount: 110, date: "18th Apr 25", status: "Cancelled" },
  { id: 27213, amount: 110, date: "18th Apr 25", status: "Completed" },
  { id: 27214, amount: 110, date: "18th Apr 25", status: "Completed" },
  { id: 27215, amount: 110, date: "18th Apr 25", status: "No Show" },
  { id: 27216, amount: 110, date: "18th Apr 25", status: "Rejected" },
];

const OrderHistory: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  React.useEffect(() => {
    if (tabRefs.current[activeTab]) {
      tabRefs.current[activeTab]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeTab]);

  return (
    <Container>
      <div className="flex-1 overflow-hidden bg-[#F7F7F7] flex flex-col">
        <div>
          <div className="flex items-center px-4 pt-4 pb-4 bg-[#FFFFFF]">
            <button
              className="w-9 h-9 rounded-full bg-[#E9FFE5] flex items-center justify-center mr-2"
              onClick={() => navigate(-1)}
            >
              <img src={profileBack} alt="Back" className="w-4 h-4" />
            </button>
            <span className="text-lg font-normal text-[#212121] font-outfit">
              Order History
            </span>
          </div>

          <div className="flex border-b border-[#ECECEC] bg-[#FFFFFF] justify-start overflow-x-auto flex-nowrap whitespace-nowrap scrollbar-hide max-w-full">
            {TABS.map((tab, idx) => {
              return (
                <button
                  key={tab.label}
                  ref={(el) => (tabRefs.current[idx] = el)}
                  className={`px-4 flex flex-col items-center pt-2 pb-3 transition-colors duration-150 ${activeTab === idx ? "border-b-2 border-[#38963B]" : ""
                    }`}
                  onClick={() => setActiveTab(idx)}
                >
                  <div
                    className={`relative px-2 text-sm font-medium duration-150 ${activeTab === idx
                      ? "text-[#38963B] font-normal"
                      : "text-[#212121] font-normal"
                      }`}
                    style={{ display: "inline-block" }}
                  >
                    {tab.label}{" "}
                    <span className="text-xs font-normal">({tab.count})</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 bg-[#F7F7F7] px-4 pt-4 pb-4 overflow-y-auto scrollbar-hide">
          {ORDERS.filter(order => order.status === TABS[activeTab].label).map((order, i) => (
            <div
              key={i}
              className="bg-[#FFFFFF] rounded-[16px] px-4 py-3 mb-3 shadow-[0_0_20px_rgba(242,93,70,0.05)] flex items-center justify-between cursor-pointer"
              onClick={() => navigate(`/order-history/${order.id}`)}
            >
              <div>
                <div className="text-base font-medium text-[#212121] font-outfit">
                  Order #{order.id}
                </div>
                <div className="text-[14px] font-medium text-[#212121] mt-1 font-outfit">
                  ₹{order.amount}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-[#7C7C7C] font-medium font-outfit">
                  {order.date}
                </span>
                <span className="mt-2 w-6 h-6 flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 15l4-4-4-4"
                      stroke="#212121"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default OrderHistory;
