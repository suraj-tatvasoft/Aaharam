import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const TIME_SLOTS = [
    "12:00 PM - 12:30 PM",
    "12:30 PM - 01:00 PM",
    "01:00 PM - 01:30 PM",
    "01:30 PM - 02:00 PM",
    "02:00 PM - 02:30 PM",
    "02:30 PM - 03:00 PM",
    "03:00 PM - 03:30 PM",
];

const PreferenceSelection = () => {
    const [selected, setSelected] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // You can handle the submit logic here
        // For now, just go back or show a toast
        navigate(-1);
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <div className="max-w-md w-full mx-auto flex flex-col flex-1">
                <div className="flex items-center gap-3 px-4 pt-8 pb-4">
                    <Avatar className="w-10 h-10">
                        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" alt="User" />
                    </Avatar>
                    <span className="font-semibold text-lg">My Preferred Lunch Time Slot</span>
                </div>
                <form className="flex flex-col flex-1 bg-[#FAFAFA] rounded-2xl px-4 pt-4 pb-2 mx-2" onSubmit={handleSubmit}>
                    <div className="font-semibold text-base mb-3">Select Your Time Slot</div>
                    <div className="flex-1 overflow-y-auto flex flex-col gap-3">
                        {TIME_SLOTS.map((slot) => (
                            <label key={slot} className="flex items-center justify-between py-1 cursor-pointer">
                                <span className="text-[15px] font-medium text-black">{slot}</span>
                                <input
                                    type="radio"
                                    name="timeSlot"
                                    value={slot}
                                    checked={selected === slot}
                                    onChange={() => setSelected(slot)}
                                    className="form-radio w-5 h-5 accent-black"
                                />
                            </label>
                        ))}
                    </div>
                    <div className="mt-auto pt-8">
                        <button
                            type="submit"
                            className="w-full h-12 text-lg bg-black text-white rounded-xl font-semibold"
                            disabled={!selected}
                        >
                            Submit
                        </button>
                    </div>
                </form>
                <div className="w-24 h-1.5 bg-black rounded-full mx-auto mt-4 mb-2" />
            </div>
        </div>
    );
};

export default PreferenceSelection;
