import React from "react";
import chefIllustration from "@/assets/onboarding-1.svg";
import nextArrow from "@/assets/next-arrow.svg";

const OnBoarding: React.FC = () => {
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-white">
            <div className="max-w-md w-full flex flex-col justify-center items-center px-6 py-8 mx-auto">
                {/* Heading */}
                <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl text-black text-left w-full mb-8 leading-tight">
                    <span className="block">Order</span>
                    <span className="block">what you</span>
                    <span className="block">love most</span>
                </h1>
                {/* Chef Illustration */}
                <img
                    src={chefIllustration}
                    alt="Chef holding a dish"
                    className="w-64 max-w-full mx-auto mb-8"
                />
                {/* Pagination Dots */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <span className="w-3 h-3 rounded-full bg-black inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-gray-300 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-gray-300 inline-block"></span>
                </div>
                {/* Description */}
                <p className="text-center text-base text-gray-700 mb-8 px-2">
                    Explore morning snacks, lunch, and evening meals— all in one easy-to-use menu.
                </p>
                {/* Next Button */}
                <button className="w-16 h-10 px-6 rounded-full bg-black flex items-center justify-center mx-auto mb-4 shadow-md active:scale-95 transition-transform">
                    <img src={nextArrow} alt="Next" className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default OnBoarding;
