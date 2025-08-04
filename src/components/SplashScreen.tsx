import React from "react";

// Asset imports
import logo from "@/assets/main-logo.svg";
import illustration from "@/assets/splash-main.svg";

const SplashScreen: React.FC = () => {
  return (
    <div className="w-full h-screen bg-white flex flex-col justify-between">
      {/* Top Section: Logo & Branding */}
      <div className="flex flex-col items-center justify-center flex-1 pt-8">
        <img
          src={logo}
          alt="Aaharam Logo"
          className="w-48 h-auto mx-auto mb-6"
        />
        <div className="flex flex-col items-center">
          <span className="font-bold text-lg text-black">TatvaSoft</span>
          <span className="text-xs text-gray-500 font-normal mt-1">sculpting thoughts...</span>
        </div>
      </div>
      {/* Bottom Section: Illustration & Wave */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: 220 }}>
        {/* SVG Wave */}
        <svg
          className="absolute top-0 left-0 w-full"
          viewBox="0 0 375 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 60C62.5 20 312.5 20 375 60V0H0V60Z"
            fill="#E9FFE4"
          />
        </svg>
        {/* Illustration */}
        <div className="relative z-10 flex justify-center items-end h-[180px] md:h-[200px]">
          <img
            src={illustration}
            alt="Woman Eating"
            className="w-64 h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
