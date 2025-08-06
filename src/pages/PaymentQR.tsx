import React from "react";
import PageLayout from "@/components/PageLayout";

const user = {
    name: "Itesh Sharma",
    upi: "test@upi",
    initials: "IS",
    qr: "https://api.qrserver.com/v1/create-qr-code/?data=test@upi&size=200x200", // Placeholder QR
};

const PaymentQR: React.FC = () => {
    return (
        <PageLayout title="Payment QR">

            <div className="relative w-full flex justify-center items-center flex-1">
                <div className="relative isolate flex flex-col items-center px-[30px] pt-[60px] pb-[30px] gap-[30px] rounded-[16px] w-[289px] min-h-[350px] bg-white">
                    {/* Avatar Circle */}
                    <div className="absolute left-1/2 -translate-x-1/2 -top-10 z-10">
                        <div className="w-[80px] h-[80px] rounded-full bg-[#38963B] border-[6px] border-white flex items-center justify-center text-white text-[20px] font-medium leading-[25px]">
                            {user.initials}
                        </div>
                    </div>
                    {/* Name & UPI */}
                    <div className="flex flex-col items-center gap-[10px] mt-0">
                        <span className="font-outfit font-medium text-[16px] leading-[20px] text-[#212121] text-center">{user.name}</span>
                        <span className="font-outfit font-normal text-[13px] leading-[16px] text-[#212121] text-center mt-1">UPI ID - {user.upi}</span>
                    </div>
                    {/* QR Code */}
                    <img
                        src={user.qr}
                        alt="QR Code"
                        className="w-[200px] h-[200px] mt-[18px] rounded"
                    />
                </div>
            </div>
        </PageLayout>
    );
};

export default PaymentQR;
