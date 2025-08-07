import { PieChart, Pie, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import Container from "@/components/Container";

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

  return (
    <Container>
      <div className="flex-1 flex flex-col bg-[#E1FFE0]">
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
          <h1 className="text-xl font-normal text-center px-3 py-1 mt-1 text-[#212121] font-outfit">
            Welcome Dhiren Devganiya
          </h1>
        </div>
        {/* Card container */}
        <div className="flex-1 flex flex-col justify-end items-center pb-0">
          <div className="w-full flex flex-col flex-1 justify-end items-center">
            <div className="bg-white rounded-t-3xl shadow-xl px-4 pt-8 pb-0 w-full relative z-10 mt-[-16px] flex flex-col flex-1">
              <div className="text-center mb-5">
                <div className="text-[14px] font-normal text-[#141414] font-outfit">
                  Let’s check how crowded it gets during lunch hours.
                </div>
                <div className="text-[14px] font-normal text-[#141414] font-outfit">
                  Select your preferred lunch time before using Aaharam.
                </div>
              </div>
              <div className="flex flex-col items-center flex-1 justify-start bg-white">
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
                        const radius =
                          innerRadius + (outerRadius - innerRadius) * 0.5;
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
                      activeShape={null}
                      stroke="none"
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
                {/* Screenshot-style Legend: 2 columns, 4 rows */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-8 w-[311px] mx-auto mb-2">
                  {data.map((entry, index) => (
                    <div
                      key={entry.name}
                      className="flex flex-row items-center gap-2"
                    >
                      <span
                        className="inline-block w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                      <span className="font-outfit font-normal text-[12px] leading-5 text-[#141414]">
                        {entry.name} ({entry.value}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Action Button pinned to bottom of card */}
              <div className="mt-auto pb-4 pt-4">
                <Button
                  className="w-full h-11 font-medium text-base bg-[#212121] text-white rounded-lg font-outfit shadow-sm hover:bg-[#181818] transition-colors"
                  size="lg"
                  onClick={() => navigate("/preference-selection")}
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
