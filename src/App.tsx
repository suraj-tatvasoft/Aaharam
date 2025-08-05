import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import MonthlyPassSummary from "@/pages/MonthlyPassSummary";
import Navigation from "./components/Navigation";
import Analytics from "./pages/Analytics";
import PreferenceSelection from "./pages/PreferenceSelection";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import FoodDelivery from "./pages/FoodDelivery";
import SplashScreen from "./components/SplashScreen";
import OnBoarding from "./components/OnBoarding";
import BulkPass from "./pages/BulkPass";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PaymentQR from "./pages/PaymentQR";
import Favorites from "./pages/Favorites";
import FoodPantryHours from "./pages/FoodPantryHours";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/login" element={<Login />} />
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/onboarding" element={<OnBoarding />} />
        <Route path="/bulk-pass" element={<BulkPass />} />
        <Route path="/monthly-pass-summary" element={<MonthlyPassSummary />} />
        <Route path="/food-delivery" element={<FoodDelivery />} />
        <Route path="/preference-selection" element={<PreferenceSelection />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment-qr" element={<PaymentQR />} />
<Route path="/favorites" element={<Favorites />} />
        <Route path="/food-pantry-hours" element={<FoodPantryHours />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
