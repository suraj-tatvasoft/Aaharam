import React from "react";
import Container from "@/components/Container";

// Asset imports
import logo from "@/assets/main-logo.svg";
import illustration from "@/assets/splash-main.svg";
import tatvaSoftLogo from "@/assets/main-logo-tatvasoft.svg";

const SplashScreen: React.FC = () => {
  return (
    <Container>
      <div className="w-full min-h-screen flex flex-col items-center bg-white">
      <div className="flex-1 flex flex-col justify-between max-w-md w-full mx-auto pt-4 pb-2">
        {/* Top Section: Logo & Branding */}
        <div className="flex flex-col items-center justify-center flex-1 pt-8">
          <img
            src={logo}
            alt="Aaharam Logo"
            className="w-48 h-auto mx-auto mb-6"
          />
          <div className="flex flex-col items-center">
            <img src={tatvaSoftLogo} alt="TatvaSoft Logo" className="w-auto h-auto mb-1" />
          </div>
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
          <div className="absolute left-1/2 -translate-x-1/2 bottom-2 z-20">
            <div className="w-24 h-1.5 rounded-full bg-black" />
          </div>
        </div>
      </div>
      </div>
    </Container>
  );
};

export default SplashScreen;
