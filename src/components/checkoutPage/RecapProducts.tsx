/* components/recapProducts */

"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/index";
import Image from "next/image";
import { devisIcon } from "@/assets/imageModule";

const RecapProducts: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalHT = cartItems.reduce((sum, item) => sum + item.totalHT, 0);
  const totalTTC = cartItems.reduce((sum, item) => sum + item.totalTTC, 0);

  return (
    <div className="w-[800px]">
      <h2 className="text-xl font-semibold mb-2">Produits sélectionnés</h2>
      <ul className="border rounded-md">
        {cartItems.map((item) => (
          <li key={item.id} className="flex gap-4 my-4">
            <Image
              src={devisIcon}
              alt="Devis Icon"
              width={60}
              height={40}
            />
            <div>
              <p>Devis Numéro: {item.devisNumber}</p>
              <p>Total HT: {item.totalHT.toFixed(2)}€</p>
              <p>Total TTC: {item.totalTTC.toFixed(2)}€</p>
            </div>
          </li>
        ))}
        <div className="flex justify-around border-t py-4">
          <p className="font-bold">Total HT: {totalHT.toFixed(2)}€</p>
          <p className="font-bold">Total TTC: {totalTTC.toFixed(2)}€</p>
        </div>
      </ul>
    </div>
  );
};

export default RecapProducts;
