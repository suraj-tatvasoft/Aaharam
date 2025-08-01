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
    <div className="min-h-screen bg-gradient-to-br from-success/10 via-background to-success/5 p-4">
      <div className="max-w-sm mx-auto space-y-6">
        {/* Header */}
        <div className="text-center pt-6">
          <Avatar className="w-16 h-16 mx-auto mb-4 md:w-20 md:h-20">
            <AvatarImage 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" 
              alt="Dhiren Devganiya"
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-br from-success/20 to-success/30 text-success font-semibold text-lg md:text-xl">
              DD
            </AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-bold mb-2 md:text-2xl">Welcome Dhiren Devganiya</h1>
        </div>

        {/* Analytics Card */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center pb-3">
            <CardTitle className="text-base md:text-lg">
              Let's check how crowded it gets during lunch hours.
            </CardTitle>
            <p className="text-sm text-muted-foreground md:text-base">
              Select your preferred lunch time before using Adharam.
            </p>
          </CardHeader>
          
          <CardContent className="px-4">
            {/* Pie Chart */}
            <div className="h-56 mb-4 md:h-64 md:mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={85}
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
                  <span className="text-muted-foreground">
                    {entry.name} ({entry.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <Button 
          className="w-full h-12 text-lg bg-foreground text-background hover:bg-foreground/90"
          size="lg"
        >
          Select Your Preferred Lunch Time
        </Button>
      </div>
    </div>
  );
};

export default Analytics;