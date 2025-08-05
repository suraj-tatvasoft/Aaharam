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

            <div className="relative w-full flex justify-center mt-20">
                <div className="bg-white rounded-2xl shadow-lg pt-14 pb-10 px-0 max-w-[340px] w-full flex flex-col items-center" style={{ minHeight: 400 }}>
                    {/* Avatar Circle */}
                    <div className="absolute left-1/2 -translate-x-1/2 -top-10 z-10">
                        <div className="w-20 h-20 rounded-full bg-[#43A047] border-4 border-white flex items-center justify-center text-white text-2xl font-bold shadow-md">
                            {user.initials}
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col items-center">
                        <span className="text-base font-semibold text-[#222]">{user.name}</span>
                        <span className="text-xs text-[#555] mt-1">UPI ID - {user.upi}</span>
                    </div>
                    <img
                        src={user.qr}
                        alt="QR Code"
                        className="mt-7 mb-2 w-44 h-44 rounded"
                    />
                </div>
            </div>
        </PageLayout>
    );
};

export default PaymentQR;
