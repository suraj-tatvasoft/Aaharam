import { useEffect, useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import OnBoarding from "@/components/OnBoarding";
import FadeTransition from "@/components/FadeTransition";
import "@/components/fade-transition.css";

const Home = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <FadeTransition show={showSplash}>
      {showSplash ? <SplashScreen /> : <OnBoarding />}
    </FadeTransition>
  );
};

export default Home;
