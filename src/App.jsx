import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { FoodRescueProvider } from './context/FoodRescueContext';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import DashboardLayout from './components/layout/DashboardLayout';
import ToastContainer from './components/common/ToastContainer';

// Pages
import HomePage from './pages/HomePage';
import AvailableFoodPage from './pages/AvailableFoodPage';
import DonateFoodPage from './pages/DonateFoodPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ImpactPage from './pages/ImpactPage';
import VolunteerDashboard from './pages/VolunteerDashboard';
import MyPickupsPage from './pages/MyPickupsPage';
import CompletedPickupsPage from './pages/CompletedPickupsPage';
import VolunteerImpactPage from './pages/VolunteerImpactPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import SignInPage from './pages/SignInPage';
import RegisterVolunteerPage from './pages/RegisterVolunteerPage';

// Scroll to top upon page navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function AppContent() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 selection:bg-[#e8f7f0] selection:text-[#056b4e]">
      <Navbar />
      
      <main className={`flex-1 ${isHome ? '' : 'pt-20'}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/available-food" element={<AvailableFoodPage />} />
          <Route path="/donate" element={<DonateFoodPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/register-volunteer" element={<RegisterVolunteerPage />} />
          
          {/* Volunteer Portal */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<VolunteerDashboard />} />
            <Route path="pickups" element={<MyPickupsPage />} />
            <Route path="completed" element={<CompletedPickupsPage />} />
            <Route path="impact" element={<VolunteerImpactPage />} />
          </Route>

          {/* Dedicated Admin Portal */}
          <Route path="/admin" element={<AdminDashboardPage />} />

          {/* Fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <Footer />
      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <FoodRescueProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </FoodRescueProvider>
  );
}

export default App;
