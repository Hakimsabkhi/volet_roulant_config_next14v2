"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { signOut } from "next-auth/react";
import Image from 'next/image';
import { userIcon } from '../assets/imageModule';
import { useSessionData } from '@/content/session/useSessionData'; // Adjust the import path as necessary

const Dropdown: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { session, loading } = useSessionData();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const closeDropdown = useCallback(() => {
    setDropdownOpen(false);
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      closeDropdown();
    }
  }, [closeDropdown]);

  const handleScroll = useCallback(() => {
    closeDropdown();
  }, [closeDropdown]);

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
  }, [dropdownOpen, handleClickOutside, handleScroll]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id="dropdownUserButton"
        onClick={toggleDropdown}
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
        className="w-[50px] h-[50px] bg-none border-none cursor-pointer flex items-center justify-center bg-cbutton shadow-[0_2px_6px_rgba(0,0,0,0.952)] rounded-[4px] transition-shadow duration-300 ease z-[1000] hover:bg-cwhite focus:bg-cwhite focus:outline-none"
        type="button"
      >
        <Image src={userIcon} loading="eager" alt="User Icon" className="button-icon" width={40} height={40} />
      </button>

      {dropdownOpen && !loading && session && (
        <div
          id="dropdownAvatar"
          className="absolute right-0 p-2 mt-4 bg-primary rounded-md shadow-lg z-[1000] w-fit"
          role="menu"
          aria-labelledby="dropdownUserButton"
        >
          <div className="px-4 py-3 text-sm text-white border-b">
            <div>{session.user?.name}</div>
            <div>{session.user?.email}</div>
            <div>Role: {session.user?.role}</div>
          </div>
          <ul className="py-2 text-sm text-white" aria-labelledby="dropdownUserButton">
            <li>
              <a href="/" className="block w-full px-4 py-2 text-sm text-left text-white hover:bg-white hover:text-black">
                Page d&apos;accueil
              </a>
            </li>
            {(session.user?.role === 'SuperAdmin' || session.user?.role === 'Admin') && (
              <li>
                <a href="/admin/dashboard" className="block w-full px-4 py-2 text-sm text-left text-white hover:bg-white hover:text-black">
                  Dashboard
                </a>
              </li>
            )}
            <li>
              <a href="#" className="block w-full px-4 py-2 text-sm text-left text-white hover:bg-white hover:text-black">
                Settings
              </a>
            </li>
          </ul>
          <div className="py-2">
            <button
              onClick={() => {
                signOut({ callbackUrl: '/auth/signin' });
                closeDropdown();
              }}
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