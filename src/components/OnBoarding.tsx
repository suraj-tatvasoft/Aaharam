import React from "react";
import chefIllustration from "@/assets/onboarding-1.svg";
import nextArrow from "@/assets/next-arrow.svg";

const OnBoarding: React.FC = () => {
    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-white">
            <div className="flex-1 flex flex-col justify-between max-w-md w-full mx-auto pt-4 pb-2">
                {/* Heading and Illustration */}
                <h1 className="font-semibold px-6 text-3xl sm:text-4xl md:text-5xl text-black text-left w-full mt-8 mb-8 leading-tight">
                    <span className="block">Order</span>
                    <span className="block">what you</span>
                    <span className="block">love most</span>
                </h1>
                <div className="flex flex-1 items-center justify-center mb-1">
                    <img
                        src={chefIllustration}
                        alt="Chef holding a dish"
                        className="w-full max-w-full mx-auto mb-2"
                    />
                </div>
            </div>
            {/* Bottom Section: Pagination, Description, Button, Indicator */}
            <div className="max-w-md w-full mx-auto flex flex-col items-center bg-white pb-6 z-30">
                {/* Pagination Dots */}
                <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="w-6 h-3 rounded-full bg-black inline-block transition-all"></span>
                    <span className="w-3 h-3 rounded-full bg-gray-300 inline-block transition-all"></span>
                    <span className="w-3 h-3 rounded-full bg-gray-300 inline-block transition-all"></span>
                </div>
                {/* Description */}
                <p className="text-center text-base text-gray-700 mb-4 px-4">
                    Explore morning snacks, lunch, and evening meals— all in one easy-to-use menu.
                </p>
                {/* Next Button */}
                <button className="w-16 h-10 px-6 rounded-full bg-black flex items-center justify-center mx-auto mb-4 shadow-md active:scale-95 transition-transform">
                    <img src={nextArrow} alt="Next" className="w-6 h-6" />
                </button>
                {/* Indicator Bar */}
                <div className="w-24 h-1.5 rounded-full bg-black mx-auto" />
            </div>
        </div>
    );
};

export default OnBoarding;
