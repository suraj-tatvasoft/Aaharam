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

const ORDERS = [
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
  { id: 27212, amount: 110, date: "18th Apr 25", status: "Cancelled" },
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
      <div className="min-h-screen max-h-screen bg-[#fff] flex flex-col">
        <div>
          <div className="flex items-center px-4 pt-6 pb-4 bg-white">
            <button
              className="w-9 h-9 rounded-full bg-[#EAF6E6] flex items-center justify-center mr-3"
              onClick={() => navigate(-1)}
            >
              <img src={profileBack} alt="Back" className="w-5 h-5" />
            </button>
            <span className="text-lg font-semibold text-black">
              Order History
            </span>
          </div>

          <div className="flex border-b border-[#ECECEC] bg-white justify-start overflow-x-auto flex-nowrap whitespace-nowrap scrollbar-hide max-w-full">
            {TABS.map((tab, idx) => {
              return (
                <button
                  key={tab.label}
                  ref={(el) => (tabRefs.current[idx] = el)}
                  className={`px-4 flex flex-col items-center pt-2 pb-3 transition-colors duration-150 ${
                    activeTab === idx ? "border-b-2 border-[#2B9E76]" : ""
                  }`}
                  onClick={() => setActiveTab(idx)}
                >
                  <div
                    className={`relative px-2 text-sm font-medium duration-150 ${
                      activeTab === idx
                        ? "text-[#2B9E76] font-medium"
                        : "text-[#232323] font-medium"
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

        <div className="flex-1 bg-[#FAFAFA] px-4 pt-3 pb-4 overflow-y-auto scrollbar-hide">
          {ORDERS.filter(order => order.status === TABS[activeTab].label).map((order, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl px-4 py-3 mb-3 shadow-sm flex items-center justify-between"
            >
              <div>
                <div className="text-base font-semibold text-black">
                  Order #{order.id}
                </div>
                <div className="text-[15px] font-medium text-[#2B9E76] mt-1">
                  ₹{order.amount}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-[#7C7C7C] font-medium">
                  {order.date}
                </span>
                <span className="mt-2 w-6 h-6 flex items-center justify-center">
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 13l4-4-4-4"
                      stroke="#A8A8A8"
                      strokeWidth="2"
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
