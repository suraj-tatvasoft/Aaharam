import PageLayout from '@/components/PageLayout';

const PANTRY_HOURS = [
  { label: 'Break Fast', time: '08:30 AM - 10:00 AM' },
  { label: 'Lunch', time: '12:00 PM - 03:30 PM' },
  { label: 'Evening Snacks', time: '03:30 PM - 06:30 PM' },
  { label: 'Sides', time: '08:30 AM - 06:30 PM' },
];

const FoodPantryHours = () => {
  return (
    <PageLayout title="Food Pantry Hours">
      <div className="flex w-full flex-1 flex-col items-center p-4">
        <div className="flex w-full flex-col items-center gap-4">
          {PANTRY_HOURS.map((item) => (
            <div
              key={item.label}
              className="flex w-full flex-row items-center justify-between gap-2 rounded-[16px] bg-white px-4 py-[14px] shadow-sm"
            >
              <span className="font-outfit text-[14px] font-normal leading-[18px] text-[#212121]">{item.label}</span>
              <span className="font-outfit text-right text-[14px] font-normal leading-[18px] text-[#212121]">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default FoodPantryHours;
