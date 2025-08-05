import PageLayout from "@/components/PageLayout";

const PANTRY_HOURS = [
  { label: "Break Fast", time: "08:30 AM - 10:00 AM" },
  { label: "Lunch", time: "12:00 PM - 03:30 PM" },
  { label: "Evening Snacks", time: "03:30 PM - 06:30 PM" },
  { label: "Sides", time: "08:30 AM - 06:30 PM" },
];

const FoodPantryHours = () => {
  return (
    <PageLayout title="Food Pantry Hours">
      <div className="w-full max-w-md mx-auto min-h-[100dvh] bg-[#FAFAFA] flex flex-col items-center pt-4">
        <div className="w-full flex flex-col gap-5 px-2 mt-2">
          {PANTRY_HOURS.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between bg-white rounded-2xl py-5 px-5 text-[17px] font-medium text-[#222] shadow-sm"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              <span>{item.label}</span>
              <span className="text-right font-normal text-[16px] text-[#222]">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default FoodPantryHours;
