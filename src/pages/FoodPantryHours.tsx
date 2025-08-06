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
      <div className="w-full flex-1 flex flex-col items-center pt-4">
        <div className="w-full flex flex-col gap-4 px-4 items-center mt-2">
          {PANTRY_HOURS.map((item) => (
            <div
              key={item.label}
              className="flex flex-row justify-between items-center px-4 py-[14px] gap-2 bg-white rounded-[16px] shadow-sm w-full"
            >
              <span className="font-outfit font-normal text-[14px] leading-[18px] text-[#212121]">{item.label}</span>
              <span className="font-outfit font-normal text-[14px] leading-[18px] text-[#212121] text-right">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default FoodPantryHours;
