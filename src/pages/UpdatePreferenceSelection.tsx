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
                    <div className="font-semibold text-base px-5 pt-2 pb-2 text-[#222] flex-none" style={{ letterSpacing: 0 }}>Select Your Time Slot</div>
                    <form className="flex-1 flex flex-col gap-0 px-2 overflow-y-auto scrollbar-hide" onSubmit={e => {
                        e.preventDefault();
                    }}>

                        {TIME_SLOTS.map((slot, idx) => {
                            const checked = selected === slot;
                            return (
                                <label
                                    key={slot}
                                    className={`flex items-center justify-between py-[13px] px-2 cursor-pointer rounded-lg transition mb-1 ${checked ? 'bg-[#F6FFF4]' : ''}`}
                                    style={{ minHeight: 44 }}
                                >
                                    <span className="text-[15px] font-medium text-[#222] flex-1" style={{ lineHeight: '22px' }}>{slot}</span>
                                    <span className="flex items-center justify-center relative ml-3">
                                        <span className={`flex items-center justify-center ${checked ? 'bg-[#E9FFE5]' : ''} rounded-full`} style={{ width: 24, height: 24 }}>
                                            <input
                                                type="radio"
                                                name="timeSlot"
                                                value={slot}
                                                checked={checked}
                                                onChange={() => setSelected(slot)}
                                                className="appearance-none w-5 h-5 rounded-full border-1 transition-all duration-150"
                                                style={{
                                                    borderColor: checked ? '#43A047' : '#B5B5B5',
                                                    boxShadow: checked ? '0 0 0 1px #43A047' : undefined,
                                                    background: checked ? '#fff' : '#fff',
                                                }}
                                            />
                                            {checked && (
                                                <span
                                                    className="absolute rounded-full"
                                                    style={{
                                                        width: 12,
                                                        height: 12,
                                                        background: '#43A047',
                                                        left: 6,
                                                        top: 6,
                                                        border: '1px solid #fff',
                                                        boxSizing: 'border-box',
                                                    }}
                                                ></span>
                                            )}
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
                            className="w-full h-12 text-base bg-[#43A047] text-white rounded-xl font-semibold shadow-sm hover:bg-[#388E3C] transition-colors"
                            disabled={!selected}
                            style={{ letterSpacing: 0.2 }}
                        >
                            Update My Preferred Time Slot
                        </button>
                        <button
                            type="button"
                            className="w-full h-12 text-base bg-white border border-[#43A047] text-[#43A047] rounded-xl font-semibold shadow-sm hover:bg-[#E9FFE5] transition-colors"
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
