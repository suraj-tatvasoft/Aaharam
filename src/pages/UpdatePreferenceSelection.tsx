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
      <div className="relative mx-auto flex h-full w-full max-w-md flex-1 flex-col bg-gradient-to-r from-[#F7F7F7] to-white to-50%">
        <div className="flex-grow-1 scrollbar-hide mb-[132px] flex flex-1 flex-col gap-[22px] overflow-y-auto rounded-br-[22px] bg-[#F7F7F7] p-4">
          <div className="flex-none text-[16px] font-medium leading-[11px] text-[#212121]">Select Your Time Slot</div>

          <form className="flex flex-1 flex-col gap-[22px]" onSubmit={(e) => e.preventDefault()}>
            {TIME_SLOTS.map((slot) => (
              <label key={slot} className="flex cursor-pointer items-center justify-between">
                <span className="text-[14px] font-light leading-[10px] text-[#212121]">{slot}</span>
                <input
                  type="radio"
                  name="timeSlot"
                  value={slot}
                  checked={selected === slot}
                  onChange={() => setSelected(slot)}
                  className="form-radio h-[14px] w-[14px] border border-[#38963B] bg-white accent-[#38963B]"
                />
              </label>
            ))}
          </form>
        </div>

        <div className="flex-grow-1 absolute bottom-0 left-0 right-0 flex w-full flex-col gap-3 rounded-tl-[22px] bg-[#FFFFFF] p-4">
          <button
            type="button"
            onClick={handleUpdate}
            className="h-11 w-full rounded-[8px] border border-[#38963B] bg-[#38963B] text-center text-[16px] font-medium leading-[11px] text-white transition-colors hover:bg-[#388E3C]"
            disabled={!selected}
          >
            Update My Preferred Time Slot
          </button>
          <button
            type="button"
            className="h-11 w-full rounded-[8px] border border-[#38963B] bg-white text-center text-[16px] font-medium leading-[11px] text-[#38963B] transition-colors hover:bg-[#E9FFE5]"
            onClick={() => navigate('/overall-time-slots')}
            style={{ letterSpacing: 0.2 }}
          >
            View Overall Time Slots
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default UpdatePreferenceSelection;
