import React, { useState, useEffect } from 'react';
import Container from '@/components/Container';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { updateUser } from '@/store/slice/userSlice';

const TIME_SLOTS = [
  '12:00 PM - 12:30 PM',
  '12:30 PM - 01:00 PM',
  '01:00 PM - 01:30 PM',
  '01:30 PM - 02:00 PM',
  '02:00 PM - 02:30 PM',
  '02:30 PM - 03:00 PM',
  '03:00 PM - 03:30 PM',
];

const PreferenceSelection = () => {
  const userPreferred = useSelector((state: RootState) => state.user.preferredLunchTime);
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userPreferred) setSelected(userPreferred);
  }, [userPreferred]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selected) {
      dispatch(updateUser({ preferredLunchTime: selected }));
    }
    navigate('/food-delivery');
  };

  return (
    <Container>
      <div className="flex flex-1 flex-col">
        <div className="mx-auto flex w-full flex-1 flex-col bg-gradient-to-r from-[#F7F7F7] to-white to-50%">
          {/* Header Section */}
          <div className="flex-grow-1 flex w-full items-center gap-2.5 rounded-bl-[22px] bg-[#FFFFFF] px-4 pb-4 pt-4">
            <Avatar className="h-[42px] w-[42px] border border-[#E5EEE3]">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" alt="User" />
            </Avatar>
            <span className="text-[18px] font-normal leading-[23px] text-[#212121]">My Preferred Lunch Time Slot</span>
          </div>
          {/* Card Section */}
          <form className="flex flex-1 flex-col shadow-sm" onSubmit={handleSubmit}>
            <div className="rounded-tr-[22px] rounded-br-[22px] bg-[#F7F7F7] p-4 flex-1">
              <div className="mb-[22px] text-[16px] font-medium leading-[20px] text-[#212121]">Select Your Time Slot</div>
            <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto">
              {TIME_SLOTS.map((slot) => (
                <label 
                  key={slot} 
                  className={`flex h-[44px] cursor-pointer items-center justify-between rounded-lg border px-4 transition-all duration-200 ${
                    selected === slot 
                      ? 'border-[#38963B] bg-[#38963B]' 
                      : 'border-[#E5E5E5] bg-[#FFFFFF] hover:border-[#38963B]'
                  }`}
                >
                  <span className={`text-[14px] font-light ${
                    selected === slot ? 'text-[#FFFFFF]' : 'text-[#212121]'
                  }`}>
                    {slot}
                  </span>
                  <div className="relative">
                    <input
                      type="radio"
                      name="timeSlot"
                      value={slot}
                      checked={selected === slot}
                      onChange={() => setSelected(slot)}
                      className="sr-only"
                    />
                    <div className={`h-[18px] w-[18px] rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      selected === slot 
                        ? 'border-[#ffffff] bg-white' 
                        : 'border-[#D1D5DB] bg-white'
                    }`}>
                      {selected === slot && (
                        <div className="h-full w-full rounded-full bg-[#FFFFFF] border-2 border-[#38963B]"></div>
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div></div>
            
            <div className="bg-[#F7F7F7]">
              <div className="mt-auto p-4 rounded-tl-[22px] bg-white">
                <button
                  type="submit"
                  className="h-11 w-full rounded-xl bg-[#212121] text-[16px] font-medium text-white disabled:opacity-50"
                  disabled={!selected}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
          {/* <IndicatorBar className="mt-4 mb-2" /> */}
        </div>
      </div>
    </Container>
  );
};

export default PreferenceSelection;
