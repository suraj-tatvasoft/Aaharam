import React, { useState } from 'react';
import Container from '@/components/Container';
import IndicatorBar from '@/components/IndicatorBar';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

const TIME_SLOTS = [
  '12:00 PM - 12:30 PM',
  '12:30 PM - 01:00 PM',
  '01:00 PM - 01:30 PM',
  '01:30 PM - 02:00 PM',
  '02:00 PM - 02:30 PM',
  '02:30 PM - 03:00 PM',
  '03:00 PM - 03:30 PM'
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
      <div className="flex flex-1 flex-col bg-[#F7F7F7]">
        <div className="mx-auto flex w-full flex-1 flex-col">
          {/* Header Section */}
          <div className="flex items-center gap-3 bg-white px-4 pb-4 pt-8">
            <Avatar className="h-[42px] w-[42px] border border-[#E5EEE3]">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" alt="User" />
            </Avatar>
            <span className="text-[18px] font-normal leading-[23px] text-[#212121]">My Preferred Lunch Time Slot</span>
          </div>
          {/* Card Section */}
          <form className="mx-2 flex flex-1 flex-col rounded-t-2xl px-4 pb-4 pt-5 shadow-sm" onSubmit={handleSubmit}>
            <div className="mb-3 text-[16px] font-medium leading-[20px] text-[#212121]">Select Your Time Slot</div>
            <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
              {TIME_SLOTS.map((slot) => (
                <label key={slot} className="flex cursor-pointer items-center justify-between py-[6px]">
                  <span className="text-[14px] font-light text-[#212121]">{slot}</span>
                  <input
                    type="radio"
                    name="timeSlot"
                    value={slot}
                    checked={selected === slot}
                    onChange={() => setSelected(slot)}
                    className="form-radio h-[14px] w-[14px] border border-[#212121] bg-white accent-[#212121]"
                  />
                </label>
              ))}
            </div>
            <div className="mt-auto pt-8">
              <button
                type="submit"
                className="h-11 w-full rounded-xl bg-[#212121] text-[16px] font-medium text-white disabled:opacity-50"
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
