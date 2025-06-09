import React from 'react'
import { useState } from 'react';
import {
  FaTachometerAlt,
  FaTags,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";


const Pricing = () => {

  const [openPricing, setOpenPricing] = useState(false);


  return (
    <div>
      {/* Pricing Dropdown */}
      <li>
        <div
          onClick={() => setOpenPricing(!openPricing)}
          className="flex justify-between items-center px-4 py-1 hover:bg-[#34495e] cursor-pointer"
        >
          <div className="flex items-center text-lg">
            <FaTags className="mr-2" />
            Pricing
          </div>
          {openPricing ? <FaChevronDown /> : <FaChevronRight />}
        </div>

        {openPricing && (
          <ul className="pl-10 pr-4 py-1 text-gray-300 space-y-2 text-base">
            {["add", "list", "heading"].map((action) => (
              <li className="hover:text-white cursor-pointer py-1">
                <NavLink key={action} to={`/${action}Pricing`}>
                  {action.charAt(0).toUpperCase() + action.slice(1)}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </li>
    </div>
  )
}

export default Pricing
