import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import PageLayout from "@/components/PageLayout";

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

const COLORS = [
  "#22c55e", // 12:00 PM
  "#a855f7", // 12:30 PM
  "#3b82f6", // 01:00 PM
  "#84cc16", // 01:30 PM
  "#f59e0b", // 02:00 PM
  "#ef4444", // 02:30 PM
  "#8b5cf6", // 03:00 PM
  "#b1916e", // 03:30 PM
];

const LEGEND = [
  { color: COLORS[0], label: "12:00 PM (24%)" },
  { color: COLORS[1], label: "12:30 PM (20%)" },
  { color: COLORS[2], label: "01:00 PM (12%)" },
  { color: COLORS[3], label: "01:30 PM (10%)" },
  { color: COLORS[4], label: "02:00 PM (09%)" },
  { color: COLORS[5], label: "02:30 PM (11%)" },
  { color: COLORS[6], label: "03:00 PM (08%)" },
  { color: COLORS[7], label: "03:30 PM (06%)" },
];

const OverallTimeSlots = () => {
  return (
    <PageLayout title="Overall Time Slots">
      <div className="w-full max-w-md mx-auto flex flex-col items-center min-h-[100dvh] pb-8" style={{ background: '#F7F7F7' }}>
        <div className="w-full flex flex-col items-center pt-2">
          <div className="w-64 h-64 flex items-center justify-center mt-2 mb-4">
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
                  stroke="none"
                >
                  {data.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 w-full px-2 mt-2">
            {LEGEND.map((item, idx) => (
              <div key={item.label} className="flex items-center min-w-[140px] mb-1">
                <span className="w-3 h-3 rounded-full mr-2" style={{ background: item.color }}></span>
                <span className="text-[15px] text-[#222] font-medium" style={{ fontFamily: 'system-ui, sans-serif' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default OverallTimeSlots;
