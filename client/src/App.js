import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ServicesHero from "./components/ServicesHero";
import Proposal from "./components/Proposal";
import CaseStudies from "./components/CaseStudies";
import Working from "./components/Working";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import ServicesDetail from "./pages/Services/ServicesDetail";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthPage from "./components/AuthPage";
import Subscription from "./pages/Subscription";
import UserSubscription from "./pages/UserSubscription";
import ForgotPassword from "./components/ForgotPassword";
import UserProfile from "./components/UserProfile";
// import Payment from "./components/Payment";
// import AdminLogin from "./AdminLogin";




function App() {
  return (
    <Router>

      <Navbar />

      <Routes>
        <Route path="/"
          element={
            <div>
              <Hero />
              <ServicesHero />
              <Proposal />
              <CaseStudies />
              <Working />
              <Team />
              <Testimonials />
              <ContactUs />
            </div>
          } />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:servicesId" element={<ServicesDetail />} />
        <Route path="/use-cases" />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/subscription"
          element={ <Subscription />}
        />
        <Route path="/my-subscriptions" element={<UserSubscription />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* <Route path="/profile" element={<UserProfile />} /> */}
        {/* <Route path="/subscription" element={<Subscription />} />*/}

        {/* <Route path="/admin" element={<AdminLogin/>}/> */}

      </Routes>
      <Footer />


    </Router>
  );
}

export default App;
