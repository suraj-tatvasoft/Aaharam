import React from 'react';
import Container from '@/components/Container';

// Asset imports
import logo from '@/assets/main-logo.svg';
import illustration from '@/assets/splash-main.svg';
import tatvaSoftLogo from '@/assets/main-logo-tatvasoft.svg';

const SplashScreen: React.FC = () => {
  return (
    <Container>
      <div className="flex w-full flex-1 flex-col items-center bg-white">
        <div className="flex w-full flex-1 flex-col justify-between">
          {/* Top Section: Logo & Branding */}
          <div className="flex flex-1 gap-5 flex-col items-center justify-center pt-8">
            <img src={logo} alt="Aaharam Logo" className="animate-fade-in-up mx-auto h-auto w-[250px]" />
            <div className="flex flex-col items-center">
              <img src={tatvaSoftLogo} alt="TatvaSoft Logo" className="animate-fade-in-up h-auto w-auto delay-300" />
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
            <div className="relative z-10 flex h-full items-end justify-center">
              <img src={illustration} alt="Woman Eating" className="h-auto w-full object-contain" />
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
