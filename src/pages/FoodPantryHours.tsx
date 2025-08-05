import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "@/components/PageLayout";

type MealTime = {
  name: string;
  timeRange: string;
};

const FoodPantryHours = () => {
  const mealTimes: MealTime[] = [
    { name: "Breakfast", timeRange: "08:30 AM - 10:00 AM" },
    { name: "Lunch", timeRange: "12:30 PM - 02:30 PM" },
    { name: "Evening Snacks", timeRange: "05:00 PM - 06:30 PM" },
    { name: "Dinner", timeRange: "08:00 PM - 10:00 PM" },
  ];

  return (
    <PageLayout title="Food Pantry Hours">
      <div className="space-y-4 p-4 w-full min-w-full bg-gray-100 flex-1">
        {mealTimes.map((meal, index) => (
          <Card key={index} className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-[#222]">{meal.name}</span>
                <span className="text-[#222]">{meal.timeRange}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
};

export default FoodPantryHours;
