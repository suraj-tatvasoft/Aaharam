import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Analytics = () => {
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
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-end items-center pb-0">
        <div className="w-full max-w-md mx-auto flex flex-col flex-1 justify-end items-center">
          {/* Avatar and Welcome outside card */}
          <div className="flex flex-col items-center -mt-10 mb-2 z-20">
            <Avatar className="w-16 h-16 mb-2 shadow-lg border-1 border-white">
              <AvatarImage
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
                alt="Dhiren Devganiya"
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-success/20 to-success/30 text-success font-semibold text-lg md:text-xl">
                DD
              </AvatarFallback>
            </Avatar>
            <h1 className="text-lg font-bold md:text-xl text-center bg-[#DFFFEA] px-3 py-1 rounded-full">Welcome Dhiren Devganiya</h1>
          </div>
          {/* Card container */}
          <div className="bg-white rounded-t-3xl shadow-xl px-5 pt-8 pb-6 w-full relative z-10 mt-[-10px]">
            <div className="text-center mb-5">
              <div className="text-base font-medium mb-1">Let’s check how crowded it gets during lunch hours.</div>
              <div className="text-sm text-gray-500">Select your preferred lunch time before using Aaharam.</div>
            </div>
            <div className="flex flex-col items-center">
              {/* Donut Chart */}
              <div className="w-64 h-64 flex items-center justify-center mb-2">
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
              <div className="grid grid-cols-2 gap-3 text-sm">
                {data.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-gray-500">
                      {entry.name} ({entry.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Action Button */}
            <Button
              className="w-full h-12 text-lg bg-foreground text-background hover:bg-foreground/90 mt-4"
              size="lg"
            >
              Select Your Preferred Lunch Time
            </Button>
            {/* Bottom Indicator Bar */}
            <div className="w-24 h-1.5 bg-black rounded-full mx-auto mt-6 mb-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;