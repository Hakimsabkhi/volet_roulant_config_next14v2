"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import RecapProducts from "@/components/checkoutPage/RecapProducts";
import AddressSelection from "@/components/checkoutPage/AddressSelection";
import PaymentMethodSelection from "@/components/checkoutPage/PaymentMethodSelection";

interface Address {
  _id: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

interface CheckoutPageProps {
  addresses: Address[];
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ addresses }) => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const router = useRouter();

  const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAddress(e.target.value);
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedAddress && paymentMethod) {
      console.log("Selected Address:", selectedAddress);
      console.log("Selected Payment Method:", paymentMethod);
      router.push("/confirmation");
    } else {
      alert("Veuillez sélectionner une adresse et une méthode de paiement.");
    }
  };

  const handleCancel = () => {
    router.push("/deviscrees");
  };

  return (
    <div className="p-4 w-full h-screen flex justify-center flex-col items-center gap-4">
      <h1 className="text-2xl font-bold mb-4">Récapitulatif de la commande</h1>

      <RecapProducts />

      <AddressSelection selectedAddress={selectedAddress} onAddressChange={handleAddressChange} addresses={addresses} />

      <PaymentMethodSelection paymentMethod={paymentMethod} onPaymentMethodChange={handlePaymentMethodChange} />

      <div className="w-[800px] flex gap-4 px-4">
        <button
          onClick={handleSubmit}
          className="nav-btn hover:bg-NavbuttonH uppercase font-bold px-2 mt-2 w-full"
        >
          Confirmer et payer
        </button>
        <button
          onClick={handleCancel}
          className="nav-btn bg-red-600 hover:bg-red-700 uppercase font-bold px-2 mt-2 w-full"
        >
          Annuler
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
