import React from "react";
import { useNavigate } from "react-router-dom";
import backArrow from "@/assets/backArrow.svg";
import alarmIcon from "@/assets/header-alarm.svg";
import pass1 from "@/assets/pass1.svg";
import pass2 from "@/assets/pass2.svg";
import pass3 from "@/assets/pass3.svg";
import Container from "@/components/Container";

const MonthlyPassSummary: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div
        className="flex-1 px-4 pt-4 pb-8 flex flex-col"
        style={{
          background: "linear-gradient(180deg, #DAFFD9 0%, #FFFFFF 132.38%)",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <button
            className="w-[42px] h-[42px] rounded-full flex items-center justify-center bg-white"
            style={{ backgroundColor: "#EEFFED" }}
            onClick={() => navigate("/")}
            aria-label="Back"
          >
            <img src={backArrow} alt="Back" className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="User profile"
                className="w-full h-full object-cover"
                onClick={() => navigate("/profile")}
              />
            </div>
            <button
              className="w-[42px] h-[42px] rounded-full relative flex items-center justify-center bg-white"
              style={{ backgroundColor: "#EEFFED" }}
              aria-label="Notifications"
              onClick={() => navigate("/notifications")}
            >
              <img src={alarmIcon} alt="Alarm" className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-[8px] text-white flex items-center justify-center">
                •
              </span>
            </button>
          </div>
        </div>

        {/* Title Section */}
        <div className="flex flex-col items-center mb-6">
          <span className="text-sm text-center text-gray-600">
            Exclusive discount on
          </span>
          <h1 className="text-3xl font-bold text-center">BULK PASS</h1>
          <span className="text-sm text-gray-600 text-center">
            Grab ₹220 Discount on Lunch Meal
          </span>
        </div>

        {/* Pass Summary Section */}
        <div className="mt-4">
          <div className="text-lg font-semibold mb-2">Pass Summary</div>
          <div className="flex items-center gap-3 py-1 text-base">
            <img src={pass1} alt="Regular Thali" />
            <span className="font-medium text-gray-900">
              Regular Thali - without buttermilk
            </span>
          </div>
          <div className="flex items-center gap-3 py-1 text-sm text-gray-700">
            <img src={pass2} alt="Calendar" />
            <span>
              Start From:{" "}
              <span className="font-semibold">
                31<sup>st</sup> Jul 2025
              </span>
            </span>
            <span className="mx-2">|</span>
            <span>
              Valid Till:{" "}
              <span className="font-semibold">
                31<sup>st</sup> Aug 2025
              </span>
            </span>
          </div>
          <div className="flex items-center gap-3 py-1 text-sm text-gray-700">
            <img src={pass3} alt="Meals Used" />
            <span>
              Meals Used: <span className="font-semibold">12</span> of 22
            </span>
          </div>
        </div>

        {/* What's Included Section */}
        <div className="h-1 bg-white w-full my-4" />
        <div className="pt-4">
          <div className="text-lg font-semibold mb-2">What’s Included</div>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
            <li>Valid for Lunch only (12:00 PM – 3:30 PM)</li>
            <li>Covers Regular Lunch Dish</li>
            <li>With or Without Buttermilk (based on plan)</li>
            <li>Not applicable for other items or combos</li>
            <li>Not valid for morning/evening snacks</li>
          </ul>
        </div>

        {/* Pass Terms Section */}
        <div className="h-1 bg-white w-full my-4" />
        <div>
          <div className="text-lg font-semibold mb-2">Pass Terms</div>
          <p className="text-sm text-gray-800 leading-relaxed">
            This pass includes one regular lunch per working day. It is
            non-transferable and applicable only for standard lunch items.
            Buttermilk is included only if your plan covers it.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default MonthlyPassSummary;
