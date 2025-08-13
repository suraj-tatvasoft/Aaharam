import React from 'react';
import PageLayout from '@/components/PageLayout';

const user = {
  name: 'Itesh Sharma',
  upi: 'test@upi',
  initials: 'IS',
  qr: 'https://api.qrserver.com/v1/create-qr-code/?data=test@upi&size=200x200', // Placeholder QR
};

const PaymentQR: React.FC = () => {
  return (
    <PageLayout title="Payment QR">
      <div className="relative flex w-full flex-1 items-start justify-center p-4 pt-[80px]">
        <div className="relative isolate flex min-h-[350px] w-[289px] flex-col items-center gap-[30px] rounded-[16px] bg-white px-[30px] pb-[30px] pt-[60px]">
          <div className="absolute -top-10 left-1/2 z-10 -translate-x-1/2">
            <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full border-[6px] border-white bg-[#38963B] text-[20px] font-medium leading-[25px] text-white">
              {user.initials}
            </div>
          </div>

          <div className="mt-0 flex flex-col items-center gap-[10px]">
            <span className="font-outfit text-center text-[16px] font-medium leading-[12px] text-[#212121]">{user.name}</span>
            <span className="font-outfit text-center text-[13px] font-normal leading-[10px] text-[#212121]">UPI ID - {user.upi}</span>
          </div>

          <img src={user.qr} alt="QR Code" className="h-[200px] w-[200px] rounded" />
        </div>
      </div>
    </PageLayout>
  );
};

export default PaymentQR;
