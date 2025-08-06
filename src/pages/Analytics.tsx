import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import Container from "@/components/Container";
import IndicatorBar from "@/components/IndicatorBar";

const Analytics = () => {
  const navigate = useNavigate();
  const data = [
    { name: "12:00 PM", value: 24, time: "12:00" },
    { name: "12:30 PM", value: 20, time: "12:30" },
    { name: "01:00 PM", value: 12, time: "01:00" },
    { name: "01:30 PM", value: 10, time: "01:30" },
    { name: "02:00 PM", value: 9, time: "02:00" },
    { name: "02:30 PM", value: 11, time: "02:30" },
    { name: "03:00 PM", value: 8, time: "03:00" },
    { name: "03:30 PM", value: 6, time: "03:30" },
  ];

  const COLORS = ["#22c55e", "#a855f7", "#3b82f6", "#84cc16", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

  return (
    <Container>
      <div className="min-h-screen flex flex-col bg-[#E1FFE0]">
        {/* Top section with avatar and welcome OUTSIDE card */}
        <div className="w-full flex flex-col items-center pt-10 pb-4">
          <Avatar className="w-14 h-14 mb-3 shadow-lg border border-white">
            <AvatarImage
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
              alt="Dhiren Devganiya"
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-br from-success/20 to-success/30 text-success font-semibold text-lg md:text-xl">
              DD
            </AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-normal text-center px-3 py-1 mt-1 text-[#212121] font-outfit">Welcome Dhiren Devganiya</h1>
        </div>
        {/* Card container */}
        <div className="flex-1 flex flex-col justify-end items-center pb-0">
          <div className="w-full flex flex-col flex-1 justify-end items-center">
            <div className="bg-white rounded-t-3xl shadow-xl px-5 pt-8 pb-0 w-full relative z-10 mt-[-16px] flex flex-col flex-1">
              <div className="text-center mb-5">
                <div className="text-base font-normal text-[#141414] mb-1 font-outfit">Let’s check how crowded it gets during lunch hours.</div>
                <div className="text-base font-normal text-[#141414] font-outfit">Select your preferred lunch time before using Aaharam.</div>
              </div>
              <div className="flex flex-col items-center flex-1 justify-start">
                {/* Donut Chart */}
                <div className="w-60 h-60 flex items-center justify-center mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {/* Legend */}
                <div className="grid grid-cols-2 gap-3 text-base font-outfit mt-2">
                  {data.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-[#212121] font-normal">
                        {entry.name} <span className="text-[#7C7C7C]">({entry.value}%)</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Action Button pinned to bottom of card */}
              <div className="mt-auto pb-7 pt-4">
                <Button
                  className="w-full h-11 font-medium text-base bg-[#212121] text-white rounded-lg font-outfit shadow-sm hover:bg-[#181818] transition-colors"
                  size="lg"
                  onClick={() => navigate('/preference-selection')}
                >
                  Select Your Preferred Lunch Time
                </Button>
              </div>
              {/* Bottom Indicator Bar */}
              {/* <IndicatorBar className="mt-6 mb-2" /> */}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Analytics;