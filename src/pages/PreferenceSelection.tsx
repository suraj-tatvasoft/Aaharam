import React, { useState } from "react";
import Container from "@/components/Container";
import IndicatorBar from "@/components/IndicatorBar";
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
        <Container>
            <div className="min-h-screen flex flex-col bg-[#F7F7F7]">
                <div className="w-full mx-auto flex flex-col flex-1">
                    {/* Header Section */}
                    <div className="flex items-center gap-3 px-4 pt-8 pb-4 bg-white">
                        <Avatar className="w-[42px] h-[42px] border border-[#E5EEE3]">
                            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" alt="User" />
                        </Avatar>
                        <span className="font-normal text-[18px] leading-[23px] text-[#212121]">My Preferred Lunch Time Slot</span>
                    </div>
                    {/* Card Section */}
                    <form className="flex flex-col flex-1 rounded-t-2xl px-4 pt-5 pb-2 mx-2 shadow-sm" onSubmit={handleSubmit}>
                        <div className="font-medium text-[16px] leading-[20px] mb-3 text-[#212121]">Select Your Time Slot</div>
                        <div className="flex-1 overflow-y-auto flex flex-col gap-3">
                            {TIME_SLOTS.map((slot) => (
                                <label
                                    key={slot}
                                    className="flex items-center justify-between py-[6px] cursor-pointer"
                                >
                                    <span className="text-[14px] font-light text-[#212121]">{slot}</span>
                                    <input
                                        type="radio"
                                        name="timeSlot"
                                        value={slot}
                                        checked={selected === slot}
                                        onChange={() => setSelected(slot)}
                                        className="form-radio w-[18px] h-[18px] accent-[#212121] border border-[#2121214D] bg-white"
                                    />
                                </label>
                            ))}
                        </div>
                        <div className="mt-auto pt-8">
                            <button
                                type="submit"
                                className="w-full h-11 text-[16px] font-medium bg-[#212121] text-white rounded-xl disabled:opacity-50"
                                disabled={!selected}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                    {/* <IndicatorBar className="mt-4 mb-2" /> */}
                </div>
            </div>
        </Container>
    );
};

export default PreferenceSelection;
