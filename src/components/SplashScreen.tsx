import React from "react";
import Container from "@/components/Container";

// Asset imports
import logo from "@/assets/main-logo.svg";
import illustration from "@/assets/splash-main.svg";
import tatvaSoftLogo from "@/assets/main-logo-tatvasoft.svg";

const SplashScreen: React.FC = () => {
  return (
    <Container>
      <div className="w-full flex-1 flex flex-col items-center bg-white">
        <div className="flex-1 flex flex-col justify-between w-full">
          {/* Top Section: Logo & Branding */}
          <div className="flex flex-col items-center justify-center flex-1 pt-8">
            <img
              src={logo}
              alt="Aaharam Logo"
              className="w-48 h-auto mx-auto mb-6 animate-fade-in-up"
            />
            <div className="flex flex-col items-center">
              <img src={tatvaSoftLogo} alt="TatvaSoft Logo" className="w-auto h-auto mb-1 animate-fade-in-up delay-300" />
            </div>
            {/* Animations: fade-in-up for logo and TatvaSoft logo */}
            <style>
              {`
              @keyframes fade-in-up {
                0% { opacity: 0; transform: translateY(30px); }
                100% { opacity: 1; transform: translateY(0); }
              }
              .animate-fade-in-up {
                animation: fade-in-up 0.8s cubic-bezier(0.4,0,0.2,1) both;
              }
              .delay-300 {
                animation-delay: 0.3s;
              }
            `}
            </style>
          </div>
          {/* Bottom Section: Illustration & Wave */}
          <div className="relative w-full">
            {/* Illustration */}
            <div className="relative z-10 flex justify-center items-end h-full">
              <img
                src={illustration}
                alt="Woman Eating"
                className="w-full h-auto object-contain"
              />
            </div>
            {/* <div className="absolute left-1/2 -translate-x-1/2 bottom-2 z-20">
            <IndicatorBar />
          </div> */}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SplashScreen;
