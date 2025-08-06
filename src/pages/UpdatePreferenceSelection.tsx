import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const TIME_SLOTS = [
    "12:00 PM - 12:30 PM",
    "12:30 PM - 01:00 PM",
    "01:00 PM - 01:30 PM",
    "01:30 PM - 02:00 PM",
    "02:00 PM - 02:30 PM",
    "02:30 PM - 03:00 PM",
    "03:00 PM - 03:30 PM",
];

const UpdatePreferenceSelection = () => {
    const [selected, setSelected] = useState<string | null>(TIME_SLOTS[0]);
    const { toast } = useToast();

    const navigate = useNavigate();
    return (
        <PageLayout title="My Preferred Lunch Time Slot">
            <div className="w-full flex flex-col flex-1 px-0" style={{ fontFamily: 'system-ui, sans-serif' }}>
                {/* Card pinned to top */}
                <div className="flex flex-col rounded-2xl px-0 pt-2 pb-2 mx-2 flex-1">
                    <div className="font-medium text-base px-2 pt-2 pb-2 text-[#212121] flex-none" style={{ letterSpacing: 0 }}>Select Your Time Slot</div>
                    <form className="flex-1 flex flex-col gap-0 px-2 overflow-y-auto scrollbar-hide" onSubmit={e => {
                        e.preventDefault();
                    }}>
                        {TIME_SLOTS.map((slot, idx) => {
                            const checked = selected === slot;
                            return (
                                <label
                                    key={slot}
                                    className="flex items-center justify-between py-2 px-0 cursor-pointer"
                                >
                                    <span className="font-outfit font-normal text-sm text-[#212121] select-none">
                                        {slot}
                                    </span>
                                    <span className="flex items-center justify-center relative ml-3">
                                        <span className="flex items-center justify-center ml-3">
                                            <label className={`relative flex items-center justify-center w-[14px] h-[14px] rounded-full cursor-pointer transition-colors duration-150 ${checked ? 'bg-[#E9FFE5]' : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="timeSlot"
                                                    value={slot}
                                                    checked={checked}
                                                    onChange={() => setSelected(slot)}
                                                    className={`appearance-none w-[14px] h-[14px] rounded-full border border-solid transition-all duration-150 cursor-pointer bg-white ${checked ? 'border-[#43A047]' : 'border-[#B5B5B5]'}`}
                                                />
                                                {checked && (
                                                    <span className="absolute top-[2px] left-[2px] w-[10px] h-[10px] rounded-full bg-[#43A047] border border-white pointer-events-none" />
                                                )}
                                            </label>
                                        </span>

                                    </span>
                                </label>
                            );
                        })}
                    </form>
                </div>
                {/* Action buttons pinned to bottom */}
                <div className="px-2 pb-4 pt-2 bg-white w-full flex-none">
                    <div className="border-t border-[#E0E0E0] mb-4"></div>
                    <div className="flex flex-col gap-3">
                        <button
                            type="submit"
                            onClick={() => {
                                toast({
                                    title: "My Preferred Lunch Time Slot",
                                    description: "Your lunch time slot has been updated successfully.",
                                });
                            }}
                            className="w-full h-11 bg-[#38963B] text-white rounded-[8px] font-outfit font-medium text-[16px] leading-[20px] text-center shadow-sm hover:bg-[#388E3C] transition-colors"
                            disabled={!selected}
                        >
                            Update My Preferred Time Slot
                        </button>
                        <button
                            type="button"
                            className="w-full h-11 bg-white border border-[#38963B] text-[#38963B] rounded-[8px] font-outfit font-medium text-base leading-[20px] text-center shadow-sm hover:bg-[#E9FFE5] transition-colors"
                            onClick={() => navigate('/overall-time-slots')}
                            style={{ letterSpacing: 0.2 }}
                        >
                            View Overall Time Slots
                        </button>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default UpdatePreferenceSelection;
