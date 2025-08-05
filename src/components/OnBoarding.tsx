import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import chefIllustration from "@/assets/onboarding-1.svg";
import onboarding2 from "@/assets/onboarding-2.svg";
import onboarding3 from "@/assets/onboarding-3.svg";
import nextArrow from "@/assets/next-arrow.svg";

const onboardingSteps = [
    {
        heading: [
            "Order",
            "what you",
            "love most"
        ],
        illustration: chefIllustration,
        alt: "Chef holding a dish",
        description: "Explore morning snacks, lunch, and evening meals— all in one easy-to-use menu."
    },
    {
        heading: [
            "Get your",
            "token and",
            "skip the wait"
        ],
        illustration: onboarding2,
        alt: "Boy with token kiosk",
        description: "Place your order, pay online, and pick up when your token is ready no chaos, no confusion."
    },
    {
        heading: [
            "Track,",
            "reorder,",
            "save time"
        ],
        illustration: onboarding3,
        alt: "Burger order history",
        description: "Access your order history, repeat meals, and download receipts right from your phone."
    }
];

const OnBoarding: React.FC = () => {
    const [step, setStep] = useState(0);
    const navigate = useNavigate();
    const { heading, illustration, alt, description } = onboardingSteps[step];

    const handleNext = () => {
        if (step < onboardingSteps.length - 1) {
            setStep(step + 1);
        } else {
            navigate('/login');
        }
    };

    return (
        <Container>
            <div className="flex flex-1 flex-col items-center bg-white">
                <div className="flex-1 flex flex-col justify-between max-w-md w-full mx-auto pt-4 pb-2">
                    {/* Heading and Illustration */}
                    <h1 className="font-semibold px-3 text-3xl sm:text-4xl md:text-5xl text-black text-left w-full mt-8 mb-8 leading-tight">
                        {heading.map((line, i) => (
                            <span className="block" key={i}>{line}</span>
                        ))}
                    </h1>
                    <div className="flex flex-1 items-center justify-center mb-1">
                        <img
                            src={illustration}
                            alt={alt}
                            className="w-full max-w-full mx-auto mb-2"
                        />
                    </div>
                </div>
                {/* Bottom Section: Pagination, Description, Button, Indicator */}
                <div className="max-w-md w-full mx-auto flex flex-col items-center bg-white pb-6 z-30">
                    {/* Pagination Dots */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                        {[0, 1, 2].map((i) => (
                            <button
                                key={i}
                                type="button"
                                className={`transition-all focus:outline-none ${step === i ? 'w-6 h-3 rounded-full bg-black' : 'w-3 h-3 rounded-full bg-gray-300'} inline-block`}
                                aria-label={`Go to step ${i + 1}`}
                                onClick={() => {
                                    if (i === onboardingSteps.length - 1 && step === onboardingSteps.length - 1) {
                                        navigate('/login');
                                    } else {
                                        setStep(i);
                                    }
                                }}
                            />
                        ))}
                    </div>
                    {/* Description */}
                    <p className="text-center text-base text-gray-700 mb-4 px-4">
                        {description}
                    </p>
                    {/* Next Button */}
                    <button
                        className="w-16 h-10 px-6 rounded-full bg-black flex items-center justify-center mx-auto mb-4 shadow-md active:scale-95 transition-transform"
                        onClick={handleNext}
                        aria-label="Next"
                    >
                        <img src={nextArrow} alt="Next" className="w-6 h-6" />
                    </button>
                    {/* Indicator Bar */}
                    <div className="w-24 h-1.5 rounded-full bg-black mx-auto" />
                </div>
            </div>
        </Container>
    );
};

import Container from "@/components/Container";

export default OnBoarding;
