interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function LogoutModal({ isOpen, onClose, onLogout }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2121211A] p-2 backdrop-blur-[4px]">
      <div className="flex w-[305px] flex-col items-center justify-center gap-0 rounded-[16px] bg-[#F5F5F5] p-0 shadow-[0px_-6px_20px_0px_#A8A8A866]">
        <div className="flex w-full flex-col items-center rounded-t-[16px] bg-white py-5 px-4">
          <span className="font-outfit text-center text-[16px] font-medium leading-[11px] text-[#212121]">Log out</span>
        </div>

        <div className="h-[4px] w-full bg-[#F5F5F5]"></div>

        <div className="font-outfit flex w-full flex-col items-center bg-white px-4 py-4 text-center text-[14px] font-light leading-[20px] text-[#212121]">
          Are you sure you want to log out of Aaharam?
        </div>

        <div className="h-[4px] w-full bg-[#F5F5F5]"></div>

        <div className="flex w-full flex-row items-center justify-center gap-4 rounded-b-[16px] bg-white">
          <button
            onClick={onClose}
            className="font-outfit flex-1 bg-transparent p-0 h-[50px] text-[14px] font-medium leading-[10px] text-[#212121B3] shadow-none"
          >
            No
          </button>
          <button
            onClick={onLogout}
            className="font-outfit flex-1 bg-transparent p-0 h-[50px] text-[14px] font-medium leading-[10px] text-[#38963B] shadow-none"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
