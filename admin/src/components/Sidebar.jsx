import React, { useState, useEffect, useRef } from "react";
import {
  FaTachometerAlt,
  FaTags,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import Pricing from "./../components/Pricing.jsx";
import Home from "./../components/Home.jsx";
import User from "./User.jsx";

const SidebarMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // or false if you want it closed initially
  const sidebarRef = useRef(null);
  const location = useLocation();

  // 📌 Close sidebar when route changes (like clicking Add/Remove/List/Edit)
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [location]);

  // 📌 Toggle Sidebar (for small screens)
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      const newState = !prev;
      console.log("Sidebar is", newState ? "opening..." : "closing...");
      return newState;
    });
  };


  return (
    <>


      {/* Toggle button for small screens */}
      <div onClick={toggleSidebar} className={`lg:hidden top-0 z-40 p-2 h-11 w-full bg-[#2c3e50] text-white`}>
        <button >{!isSidebarOpen ? "☰ NAVIGATION" : "☰ CLOSE"}</button>
      </div>


      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`bg-[#2c3e50] text-white
                 fixed left-0 z-50 h-full
                 lg:static lg:h-220 lg:block ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="hidden lg:block px-4 py-4 font-bold shadow-lg text-white text-lg border-b border-gray-700">
          ☰ NAVIGATION
        </div>

        <ul className="p-2 space-y-1 text-lg">
          <NavLink to="/dashboard">
            <li className="flex items-center px-4 py-2 hover:bg-[#34495e] cursor-pointer">
              <FaTachometerAlt className="mr-2" />
              Dashboard
            </li>
          </NavLink>

          {/* Pricing Dropdown */}
          <Pricing />

          {/* Home Dropdown */}
          < Home />
          {/* UserSubscription Dropdown */}
          <User />
        </ul>
      </div>
    </>
  );
};

export default SidebarMenu;
