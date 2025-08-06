import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';

import chefIllustration from "@/assets/onboarding-1.svg";
import onboarding2 from "@/assets/onboarding-2.svg";
import onboarding3 from "@/assets/onboarding-3.svg";
import nextArrow from "@/assets/next-arrow.svg";

import Container from "@/components/Container";

const onboardingSteps = [
    {
        heading: ["Order", "what you", "love most"],
        illustration: chefIllustration,
        alt: "Chef holding a dish",
        description: "Explore morning snacks, lunch, and evening meals— all in one easy-to-use menu."
    },
    {
        heading: ["Get your", "token and", "skip the wait"],
        illustration: onboarding2,
        alt: "Boy with token kiosk",
        description: "Place your order, pay online, and pick up when your token is ready—no chaos, no confusion."
    },
    {
        heading: ["Track,", "reorder,", "save time"],
        illustration: onboarding3,
        alt: "Burger order history",
        description: "Access your order history, repeat meals, and download receipts right from your phone."
    }
];

const OnBoarding: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const swiperRef = useRef<any>(null); // store swiper instance

    const handleNext = () => {
        if (step < onboardingSteps.length - 1) {
            swiperRef.current?.slideNext();
        } else {
            navigate("/login");
        }
    };

    return (
        <Container>
            <div className="flex flex-1 flex-col items-center bg-white">
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    onSwiper={(swiper) => (swiperRef.current = swiper)} // 🔥 THIS is key
                    onSlideChange={(swiper) => setStep(swiper.activeIndex)}
                    className="w-full flex-1"
                >
                    {onboardingSteps.map(({ heading, illustration, alt, description }, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex flex-col h-full w-full">

                                {/* Header (top fixed area) */}
                                <div className="px-4 pt-8 pb-4">
                                    <h1 className="font-light text-2xl sm:text-3xl md:text-4xl text-[#101010] text-left leading-tight animate-fade-in-up">
                                        {heading.map((line, i) => (
                                            <span className="block" key={i}>{line}</span>
                                        ))}
                                    </h1>
                                </div>

                                {/* Image area - grows to fill center space */}
                                <div className="flex-1 flex items-center justify-center">
                                    <img
                                        src={illustration}
                                        alt={alt}
                                        className="w-full max-w-full animate-fade-in-up delay-300 object-contain"
                                    />
                                </div>

                                {/* Bottom fixed area */}
                                <div className="flex flex-col items-center px-4 pb-6 gap-7">
                                    {/* Pagination Dots */}
                                    <div className="flex flex-col items-center gap-6">
                                        <div className="flex items-center justify-center gap-2 mb-4">
                                            {[0, 1, 2].map((i) => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    className={`transition-all focus:outline-none ${step === i
                                                        ? "w-4 h-2 rounded-full bg-black"
                                                        : "w-2 h-2 rounded-full bg-gray-300"
                                                        } inline-block`}
                                                    aria-label={`Go to step ${i + 1}`}
                                                    onClick={() => {
                                                        setStep(i);
                                                        swiperRef.current?.slideTo(i);
                                                    }}
                                                />
                                            ))}
                                        </div>

                                        {/* Description */}
                                        <p className="text-center text-base text-[#212121]">
                                            {description}
                                        </p>
                                    </div>

                                    {/* Next Button */}
                                    <button
                                        className="w-24 h-14 rounded-full bg-black flex items-center justify-center shadow-md active:scale-95 transition-transform"
                                        onClick={handleNext}
                                        aria-label="Next"
                                    >
                                        <img src={nextArrow} alt="Next" className="w-6" />
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>

                    ))}
                </Swiper>

                {/* Animations */}
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
        </Container>
    );
};

export default OnBoarding;
