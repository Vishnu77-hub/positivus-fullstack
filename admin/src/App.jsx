// App.jsx
import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import SidebarMenu from './components/Sidebar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddPricing from './pages/pricingpages/AddPricing';
import ListPricing from './pages/pricingpages/ListPricing';
import PricingHeading from './pages/pricingpages/PricingHeading';
import AddHome from './pages/homepages/AddHome';
import ListHome from './pages/homepages/ListHome';
import ListSubscriptions from './pages/userpages/ListSubscription';
import ListUser from './pages/userpages/ListUser';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '$';

const App = ({token}) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  // 📌 Show Login only when token is empty
  if (!token) {
    return (
      <>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login setToken={setToken} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
    );
  }

  // 📌 If token exists, show the app layout
  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      <Navbar setToken={setToken} />
      <div className="block lg:grid grid-cols-12 h-fit">
        <div className="col-span-2 w-full sticky top-14 z-40 bg-[#2c3e50]">
          <SidebarMenu />
        </div>
        <div className="col-span-10 container-lg text-base">
          <Routes>
            <Route path='/dashboard' element={
               <ProtectedRoute token={token}>
               <Dashboard token={token} />
             </ProtectedRoute>
            }/>
            <Route path="/addPricing" element={
              <ProtectedRoute token={token}>
                <AddPricing token={token} />
              </ProtectedRoute>
            } />
            <Route path="/listPricing" element={
              <ProtectedRoute token={token}>
                <ListPricing token={token} />
              </ProtectedRoute>
            } />
            <Route path="/headingPricing" element={
              <ProtectedRoute token={token}>
                <PricingHeading token={token} />
              </ProtectedRoute>
            } />
            <Route path="/addHome" element={
              <ProtectedRoute token={token}>
                <AddHome token={token} />
              </ProtectedRoute>
            } />
            <Route path="/listHome" element={
              <ProtectedRoute token={token}>
                <ListHome token={token} />
              </ProtectedRoute>
            } />
            <Route path="/UserSubscriptions" element={
              <ProtectedRoute token={token}>
                <ListSubscriptions token={token} />
              </ProtectedRoute>
            } />
            <Route path="/UserList" element={
              <ProtectedRoute token={token}>
                <ListUser token={token} />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/addPricing" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
