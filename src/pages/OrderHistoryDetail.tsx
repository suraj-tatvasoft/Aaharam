import React from "react";
import PageLayout from "@/components/PageLayout";
import { useParams } from "react-router-dom";
import { ORDERS } from "./OrderHistory";
import noShow from "@/assets/no-show.svg";

const MOCK_DETAILS = {
  token: 125,
  date: "11th July 25",
  time: "12:30 PM",
  items: [
    {
      name: "Vada pav",
      qty: 2,
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=64&q=80",
      details: ["Butter", "Less Spicy"],
    },
    {
      name: "Veg. Sandwich",
      qty: 2,
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=64&q=80",
      details: ["Grilled"],
    },
  ],
  bill: [
    { name: "Masala Tea", amount: 30 },
    { name: "Poha", amount: 80 },
  ],
  total: 110,
};

const OrderHistoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // Find the order by id from ORDERS
  const orderSummary = ORDERS.find((o) => String(o.id) === String(id));

  // Compose the order details
  const order = orderSummary
    ? {
        ...MOCK_DETAILS,
        ...orderSummary, // id, status, amount, date (if present)
      }
    : { ...MOCK_DETAILS, id: id || "-", status: "Completed" };

  return (
    <PageLayout title={`Order #${order.id}`}>
      <div className="flex flex-col items-center w-full py-4">
        <div className="text-lg font-medium text-[#212121]">Token no</div>
        <div className="text-6xl font-bold text-black mb-2">{order.token}</div>
        <div className="text-base text-[#232323] flex gap-2">
          <span>{order.date}</span>
          <span>{order.time}</span>
        </div>
        {order.status === "Completed" ? (
          <div className="mt-3 px-4 py-1 rounded-full bg-[#E9FFE4] text-[#38963B] flex items-center text-sm">
            Completed
            <svg
              className="ml-1"
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 18 18"
            >
              <circle cx="9" cy="9" r="9" fill="#38963B" />
              <path
                d="M5 9l3 3 5-5"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ) : order.status === "Rejected" ? (
          <div className="mt-3 px-4 py-1 rounded-full bg-[#FFE9E9] text-[#E74C3C] flex items-center text-sm">
            Rejected
            <svg
              className="ml-1"
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 18 18"
            >
              <circle cx="9" cy="9" r="9" fill="#E74C3C" />
              <path
                d="M6 6l6 6M12 6l-6 6"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ) : order.status === "No Show" ? (
          <div className="mt-3 px-4 py-1 rounded-full flex items-center gap-2 text-sm bg-[#F4EDFF] text-[#A259FF]">
            No Show
            <img src={noShow} alt="No Show" />
          </div>
        ) : order.status === "Cancelled" ? (
          <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-[#E2E2E2] text-[#212121] text-sm">
            Cancelled
            <svg
              className="ml-1 align-middle"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: "inline", verticalAlign: "middle" }}
            >
              <path
                d="M6 6l6 6M12 6l-6 6"
                stroke="#232323"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
        ) : null}
      </div>
      <div className="px-4 w-full">
        <div className="text-base font-semibold mb-2">Items</div>
        <div className="flex flex-col gap-3 mb-4">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl px-3 py-2 shadow-sm flex flex-col"
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-xl object-cover mr-3 border border-[#ECECEC]"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-base text-black">
                      {item.name}
                    </span>
                    <span className="text-base font-semibold text-[#232323]">
                      {item.qty}
                    </span>
                  </div>
                </div>
              </div>
              {item.details && item.details.length > 0 && (
                <div className="text-sm text-[#7C7C7C] mt-2 ml-0 pl-0 flex flex-col">
                  {item.details.map((d, i) => (
                    <p key={i}>- {d}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-base font-semibold mb-2">Bill</div>
        <div className="bg-white rounded-2xl px-3 py-2 mb-4">
          {order.bill.map((b, i) => (
            <div key={i} className="flex justify-between py-1 text-base">
              <span>{b.name}</span>
              <span>₹{b.amount}</span>
            </div>
          ))}
          <div className="border-t border-[#ECECEC] my-2"></div>
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>₹{order.total}</span>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default OrderHistoryDetail;
