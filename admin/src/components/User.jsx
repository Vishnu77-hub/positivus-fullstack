import React, { useState } from 'react';
import { FaTags, FaChevronDown, FaChevronRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const UserSubscription = () => {
  const [openUserSubscription, setOpenUserSubscription] = useState(false);

  return (
    <li>
      <div
        onClick={() => setOpenUserSubscription(!openUserSubscription)}
        className="flex justify-between items-center px-4 py-1 hover:bg-[#34495e] cursor-pointer"
      >
        <div className="flex items-center text-lg">
          <FaTags className="mr-2" />
          User 
        </div>
        {openUserSubscription ? <FaChevronDown /> : <FaChevronRight />}
      </div>

      {openUserSubscription && (
        <ul className="pl-10 pr-4 py-1 text-gray-300 space-y-2 text-base">
          <li className="hover:text-white cursor-pointer py-1">
            <NavLink to="/UserSubscriptions">
              User Subscription
            </NavLink>
          </li>
          <li className="hover:text-white cursor-pointer py-1">
            <NavLink to="/UserList">
              User List
            </NavLink>
          </li>
        </ul>
      )}
    </li>
  );
};

export default UserSubscription;
