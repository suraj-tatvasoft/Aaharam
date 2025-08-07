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
  '03:00 PM - 03:30 PM'
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
        description: 'Your lunch time slot has been updated successfully.'
      });
    }
  };

  return (
    <PageLayout title="My Preferred Lunch Time Slot">
      <div className="flex w-full flex-1 flex-col px-0">
        {/* Card pinned to top */}
        <div className="mx-2 flex flex-1 flex-col rounded-2xl px-0 pb-2 pt-2">
          <div className="flex-none px-4 pb-2 pt-2 text-base font-medium text-[#212121]" style={{ letterSpacing: 0 }}>
            Select Your Time Slot
          </div>
          <form
            className="scrollbar-hide flex flex-1 flex-col gap-3 overflow-y-auto px-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            {TIME_SLOTS.map((slot) => (
              <label key={slot} className="flex cursor-pointer items-center justify-between py-[6px]">
                <span className="text-[14px] font-light text-[#212121]">{slot}</span>
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
        {/* Action buttons pinned to bottom */}
        <div className="w-full flex-none bg-white px-2 pb-4 pt-2">
          <div className="mb-4 border-t border-[#E0E0E0]"></div>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleUpdate}
              className="font-outfit h-11 w-full rounded-[8px] bg-[#38963B] text-center text-[16px] font-medium leading-[20px] text-white shadow-sm transition-colors hover:bg-[#388E3C]"
              disabled={!selected}
            >
              Update My Preferred Time Slot
            </button>
            <button
              type="button"
              className="font-outfit h-11 w-full rounded-[8px] border border-[#38963B] bg-white text-center text-base font-medium leading-[20px] text-[#38963B] shadow-sm transition-colors hover:bg-[#E9FFE5]"
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
