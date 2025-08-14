import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import Container from '@/components/Container';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const Analytics = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const data = [
    { name: '12:00 PM', value: 24, time: '12:00' },
    { name: '12:30 PM', value: 20, time: '12:30' },
    { name: '01:00 PM', value: 12, time: '01:00' },
    { name: '01:30 PM', value: 10, time: '01:30' },
    { name: '02:00 PM', value: 9, time: '02:00' },
    { name: '02:30 PM', value: 11, time: '02:30' },
    { name: '03:00 PM', value: 8, time: '03:00' },
    { name: '03:30 PM', value: 6, time: '03:30' },
  ];

  const COLORS = [
    '#3BCD7C', // 12:00 PM
    '#B69EDB', // 12:30 PM
    '#3A92D5', // 01:00 PM
    '#C8CD99', // 01:30 PM
    '#D58ED7', // 02:00 PM
    '#FEA9A6', // 02:30 PM
    '#FDD35B', // 03:00 PM
    '#BB9A6F', // 03:30 PM
  ];

  return (
    <Container>
      <div className="flex flex-1 flex-col">
        {/* Top section with avatar and welcome OUTSIDE card */}
        <div className="flex w-full flex-col items-center bg-white">
          <div className="flex flex-col items-center pb-4 pt-10 bg-[#DFFFEA] rounded-br-[70px] w-full h-full">
          <Avatar className="mb-3 h-14 w-14 border border-[#E5EEE3]">
            <AvatarImage src={user.avatarUrl || ''} alt={user.name || 'User'} className="object-cover" />
            <AvatarFallback className="bg-gradient-to-br from-success/20 to-success/30 text-lg font-semibold text-success md:text-xl">
              {user.name.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h1 className="font-outfit mt-1 px-3 py-1 text-center text-[18px] font-medium text-[#212121]">Welcome {user.name}</h1>
          </div>
        </div>
        {/* Card container */}
        <div className="flex-1 bg-[#DFFFEA]">
          <div className="flex h-full w-full flex-1 px-4 pb-0 pt-6 flex-col items-center justify-end bg-white rounded-tl-[70px]">
            <div className="flex h-full w-full flex-1 flex-col">
              <div className="text-center">
                <div className="font-outfit text-[14px] font-normal text-[#141414]">Let’s check how crowded it gets during lunch hours.</div>
                <div className="font-outfit text-[14px] font-normal text-[#141414]">Select your preferred lunch time before using Aaharam.</div>
              </div>
              <div className="flex flex-1 flex-col items-center justify-start">
                <div className="mx-auto flex aspect-square w-full items-center justify-center p-2">
                  <ResponsiveContainer width={360} height={360}>
                    <PieChart>
                      <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={90}
                        outerRadius={160}
                        label={({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
                          const RADIAN = Math.PI / 180;
                          const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                          const x = cx + radius * Math.cos(-midAngle * RADIAN);
                          const y = cy + radius * Math.sin(-midAngle * RADIAN);
                          return (
                            <g>
                              <text x={x} y={y - 8} textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="400" fill="#212121">
                                {`${data[index].value}%`}
                              </text>
                              <text x={x} y={y + 8} textAnchor="middle" dominantBaseline="central" fontSize="10" fontWeight="400" fill="#212121">
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
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mx-auto mb-2 grid w-full max-w-[311px] grid-cols-2 gap-x-8 gap-y-3">
                  {data.map((entry, index) => (
                    <div key={entry.name} className="flex flex-row items-center gap-2">
                      <span
                        className="inline-block h-2 w-2 rounded-full"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                      <span className="font-outfit text-[12px] font-normal leading-5 text-[#141414]">
                        {entry.name} ({entry.value}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Action Button pinned to bottom of card */}
              <div className="mt-auto pb-4 pt-4">
                <Button
                  className="font-outfit h-11 w-full rounded-lg bg-[#212121] text-base font-medium text-white shadow-sm transition-colors hover:bg-[#181818]"
                  size="lg"
                  onClick={() => navigate('/preference-selection')}
                >
                  Select Your Preferred Lunch Time
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Analytics;
