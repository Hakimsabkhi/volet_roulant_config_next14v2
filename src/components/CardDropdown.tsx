"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/index";
import { removeFromCart } from "@/store/cartSlice";
import { devisIcon, PanierIcon } from "@/assets/imageModule";
import { useRouter } from "next/navigation"; // Import useRouter

const CardDropdown: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize useRouter

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
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

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  // Calculate the total HT and TTC of all devis in the cart
  const totalHT = cartItems.reduce((sum, item) => sum + item.totalHT, 0);
  const totalTTC = cartItems.reduce((sum, item) => sum + item.totalTTC, 0);

  const handleCheckout = () => {
    // Assuming you pass the necessary data through the router
    router.push("/checkout"); // Replace "/checkout" with your actual checkout page route
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id="dropdownUserButton"
        onClick={toggleDropdown}
        className="w-[50px] h-[50px] bg-none border-none cursor-pointer flex items-center justify-center bg-cbutton shadow-[0_2px_6px_rgba(0,0,0,0.952)] rounded-[4px] transition-shadow duration-300 ease z-[1000] hover:bg-cwhite focus:bg-cwhite relative"
        type="button"
      >
        <Image
          src={PanierIcon}
          loading="eager"
          alt="Cart Icon"
          className="button-icon"
          width={40}
          height={40}
        />
        {cartItems.length > 0 && (
          <span className="absolute top-1 left-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
            {cartItems.length}
          </span>
        )}
      </button>

      {/* Dropdown menu */}
      {dropdownOpen && (
        <div
          id="dropdownCart"
          className="absolute right-0 p-2 mt-2 bg-primary rounded-md shadow-lg z-[1000] w-[550px]"
        >
          {cartItems.length === 0 ? (
            <div className="px-4 py-2 text-center text-sm text-white">
              Le panier est vide
            </div>
          ) : (
            <>
              <ul>
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="px-4 py-2 flex gap-4 text-sm items-center text-white"
                  >
                    <Image
                      src={devisIcon}
                      loading="eager"
                      alt="Devis Icon"
                      className="button-icon"
                      width={60}
                      height={40}
                    />
                    <div className="flex flex-col w-full">
                      <p>Devis Numéro: {item.devisNumber}</p>
                      <p>Total HT: {item.totalHT.toFixed(2)}€</p>
                      <p>Total TTC: {item.totalTTC.toFixed(2)}€</p>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="nav-btn hover:bg-NavbuttonH uppercase font-bold px-2"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div className="px-4 py-2 flex justify-around border-t text-white">
                <p className="font-bold">Total HT: {totalHT.toFixed(2)}€</p>
                <p className="font-bold">Total TTC: {totalTTC.toFixed(2)}€</p>
              </div>
              <button
                onClick={handleCheckout} // Handle the checkout process
                className="nav-btn hover:bg-NavbuttonH uppercase font-bold px-2 mt-2 w-full"
              >
                Valider mes devis et payer
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CardDropdown;
