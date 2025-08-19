import { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
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

const UpdatePreferenceSelection = () => {
  const userPreferred = useSelector((state: RootState) => state.user.preferredLunchTime);
  const [selected, setSelected] = useState<string | null>(null);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userPreferred) setSelected(userPreferred);
    else setSelected(null);
  }, [userPreferred]);

  const handleUpdate = () => {
    if (selected) {
      dispatch(updateUser({ preferredLunchTime: selected }));
      toast({
        title: 'My Preferred Lunch Time Slot',
        description: 'Your lunch time slot has been updated successfully.',
      });
    }
  };

  return (
    <PageLayout title="My Preferred Lunch Time Slot">
      <form className="flex flex-1 flex-col shadow-sm w-full" onSubmit={(e) => e.preventDefault()}>
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
          </div>
        </div>
        
        <div className="bg-[#F7F7F7]">
          <div className="mt-auto p-4 rounded-tl-[22px] bg-white flex flex-col gap-3">
            <button
              type="button"
              onClick={handleUpdate}
              className="h-11 w-full rounded-xl bg-[#38963B] text-[16px] font-medium text-white disabled:opacity-50"
              disabled={!selected}
            >
              Update My Preferred Time Slot
            </button>
            <button
              type="button"
              className="h-11 w-full rounded-xl border border-[#38963B] bg-white text-[16px] font-medium text-[#38963B] transition-colors hover:bg-[#38963B] hover:text-white"
              onClick={() => navigate('/overall-time-slots')}
            >
              View Overall Time Slots
            </button>
          </div>
        </div>
      </form>
    </PageLayout>
  );
};

export default UpdatePreferenceSelection;
