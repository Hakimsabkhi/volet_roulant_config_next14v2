"use client";

import React from "react";

export interface Address {
  _id: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

interface AddressSelectionProps {
  selectedAddress: string | null;
  onAddressChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  addresses: Address[];
}

const AddressSelection: React.FC<AddressSelectionProps> = ({ selectedAddress, onAddressChange, addresses }) => {
  return (
    <div className="w-[800px]">
      <h2 className="text-xl font-semibold mb-2">Adresse de livraison</h2>
      <select
        value={selectedAddress || ""}
        onChange={onAddressChange}
        className="border p-2 rounded w-full"
      >
        <option value="" disabled>
          Sélectionnez une adresse
        </option>
        {addresses.map((address) => (
          <option key={address._id} value={address._id}>
            {address.street}, {address.city}, {address.postalCode}, {address.country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AddressSelection;
