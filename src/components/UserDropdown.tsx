"use client"; // This directive ensures the component is a client component

import React, { useState } from "react";
import { signOut } from "next-auth/react";
import Image from 'next/image';
import { userIcon } from '../assets/imageModule';

interface UserDropdownProps {
  userName: string;
  userEmail: string;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ userName, userEmail }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="flex flex-col items-end">
      <button
        id="dropdownUserButton"
        onClick={toggleDropdown}
        className="w-[50px] h-[50px] bg-none border-none cursor-pointer flex items-center justify-center bg-cbutton shadow-[0_2px_6px_rgba(0,0,0,0.952)] rounded-[4px] transition-shadow duration-300 ease z-[1000] hover:bg-cwhite focus:bg-cwhite"
        type="button"
      >
        <Image src={userIcon} alt="Config Icon" className="button-icon" width={40} height={40} />
      </button>

      {/* Dropdown menu */}
      {dropdownOpen && (
        <div
          id="dropdownAvatar"
          className="fixed z-10 top-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
        >
          <div className="px-4 py-3 text-sm text-gray-900">
            <div>{userName}</div> {/* Display user's name */}
            <div className="font-medium truncate">{userEmail}</div> {/* Display user's email */}
          </div>
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdownUserButton"
          >
            <li>
              <a
                href="/"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Settings
              </a>
            </li>
          </ul>
          <div className="py-2">
            <button
              onClick={() => signOut()}
              className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
