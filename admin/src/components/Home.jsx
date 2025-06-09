import React from 'react'
import { useState } from 'react';
import {
  FaTachometerAlt,
  FaTags,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

const Home = () => {

  const [openHome, setOpenHome] = useState(false);

  return (
    <div>
        <li>
              <div
                onClick={() => setOpenHome(!openHome)}
                className="flex justify-between items-center px-4 py-1 hover:bg-[#34495e] cursor-pointer"
              >
                <div className="flex items-center text-lg">
                  <FaTags className="mr-2" />
                  Home
                </div>
                {openHome ? <FaChevronDown /> : <FaChevronRight />}
              </div>

              {openHome && (
                <ul className="pl-10 pr-4 py-1 text-gray-300 space-y-2 text-base">
                  {["add", "list"].map((action) => (
                      <li className="hover:text-white cursor-pointer py-1">
                    <NavLink key={action} to={`/${action}Home`}>
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

export default Home
