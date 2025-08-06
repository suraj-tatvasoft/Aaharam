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
  "#3BCD7C", // 12:00 PM
  "#B69EDB", // 12:30 PM
  "#3A92D5", // 01:00 PM
  "#C8CD99", // 01:30 PM
  "#D58ED7", // 02:00 PM
  "#FEA9A6", // 02:30 PM
  "#FDD35B", // 03:00 PM
  "#BB9A6F", // 03:30 PM
];

const OverallTimeSlots = () => {
  return (
    <PageLayout title="Overall Time Slots">
      <div className="flex flex-col items-center flex-1 mt-4">
        <div className="w-[360px] h-[360px] flex items-center justify-center mx-auto mb-8">
          <PieChart width={360} height={360}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={120}
              outerRadius={180}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                index,
              }) => {
                const RADIAN = Math.PI / 180;
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                return (
                  <g>
                    <text
                      x={x}
                      y={y - 8}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="14"
                      fontWeight="400"
                      fill="#212121"
                    >
                      {`${data[index].value}%`}
                    </text>
                    <text
                      x={x}
                      y={y + 8}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="10"
                      fontWeight="400"
                      fill="#212121"
                    >
                      {data[index].time}
                    </text>
                  </g>
                );
              }}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div className="grid grid-cols-2 gap-y-3 gap-x-8 w-[311px] mx-auto mb-2">
          {data.map((entry, index) => (
            <div key={entry.name} className="flex flex-row items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="font-outfit font-normal text-[12px] leading-5 text-[#141414]">
                {entry.name} ({entry.value}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default OverallTimeSlots;
