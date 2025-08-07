import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import MonthlyPassSummary from '@/pages/MonthlyPassSummary';
import Analytics from './pages/Analytics';
import PreferenceSelection from './pages/PreferenceSelection';
import Login from './pages/Login';
import FoodDelivery from './pages/FoodDelivery';
import SplashScreen from './components/SplashScreen';
import OnBoarding from './components/OnBoarding';
import BulkPass from './pages/BulkPass';
import Home from './pages/Home';
import Profile from './pages/Profile';
import PaymentQR from './pages/PaymentQR';
import FoodPantryHours from './pages/FoodPantryHours';
import FeedbackScreen from './pages/FeedbackScreen';
import RulesAndRegulations from './pages/RulesAndRegulations';
import UpdatePreferenceSelection from '@/pages/UpdatePreferenceSelection';
import OverallTimeSlots from '@/pages/OverallTimeSlots';
import Notifications from '@/pages/Notifications';
import OrderHistory from '@/pages/OrderHistory';
import Favorites from './pages/Favorites';
import OrderHistoryDetail from '@/pages/OrderHistoryDetail';
import OrderDetailPage from '@/pages/OrderDetailPage';

const App = () => (
  <TooltipProvider>
    <Toaster />
    <BrowserRouter>
      <ScrollToTop />
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
        <Route path="/feedback" element={<FeedbackScreen />} />
        <Route path="/rules-and-regulations" element={<RulesAndRegulations />} />
        <Route path="/update-preference-selection" element={<UpdatePreferenceSelection />} />
        <Route path="/overall-time-slots" element={<OverallTimeSlots />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/order-history/:id" element={<OrderHistoryDetail />} />
        <Route path="/order-detail" element={<OrderDetailPage />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
