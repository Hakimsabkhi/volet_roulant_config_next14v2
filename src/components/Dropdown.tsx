"use client"; // This directive ensures the component is a client component

import React, { useState, useEffect, useRef } from "react";
import { signOut } from "next-auth/react";
import Image from 'next/image';
import { userIcon } from '../assets/imageModule';

interface UserDropdownProps {
  userName: string;
  userEmail: string;
}

const Dropdown: React.FC<UserDropdownProps> = ({ userName, userEmail }) => {
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  const handleScroll = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("scroll", handleScroll, true);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleScroll, true);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [dropdownOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id="dropdownUserButton"
        onClick={toggleDropdown}
        className="w-[50px] h-[50px] bg-none border-none cursor-pointer flex items-center justify-center bg-cbutton shadow-[0_2px_6px_rgba(0,0,0,0.952)] rounded-[4px] transition-shadow duration-300 ease z-[1000] hover:bg-cwhite focus:bg-cwhite"
        type="button"
      >
        <Image src={userIcon} loading="eager" alt="User Icon" className="button-icon" width={40} height={40} />
      </button>

      {/* Dropdown menu */}
      {dropdownOpen && (
        <div
          id="dropdownAvatar"
          className="absolute right-0 p-2 mt-2 bg-primary  rounded-md shadow-lg z-[1000] w-fit "
        >
          <div className="px-4 py-3 text-sm text-white border-b">
            <div>{userName}</div>
            <div className="font-medium truncate">{userEmail}</div>
          </div>
          <ul
            className="py-2 text-sm text-white"
            aria-labelledby="dropdownUserButton"
          >
            <li>
              <a
                href="/"
                className="block w-full px-4 py-2 text-sm text-left text-white hover:bg-white hover:text-black"
              >
                Page d&apos;accueil
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block w-full px-4 py-2 text-sm text-left text-white hover:bg-white hover:text-black"
              >
                Settings
              </a>
            </li>
          </ul>
          <div className="py-2">
            <button
              onClick={() => signOut()}
              className="block w-full px-4 py-2 text-sm text-left text-white hover:bg-white hover:text-black"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
