"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import RecapProducts from "@/components/checkoutPage/RecapProducts";
import AddressSelection from "@/components/checkoutPage/AddressSelection";
import PaymentMethodSelection from "@/components/checkoutPage/PaymentMethodSelection";
import { clearCart } from "@/store/cartSlice"; // Import your clear action

interface Address {
  _id: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

const CheckoutPage: React.FC = () => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch(); // Initialize dispatch

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/adresse/save`, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch addresses');
        }
        const data: Address[] = await response.json();
        setAddresses(data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAddress(e.target.value);
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedAddress && paymentMethod) {
      // Handle the submission logic, e.g., send the data to the backend
      console.log("Selected Address:", selectedAddress);
      console.log("Selected Payment Method:", paymentMethod);

      // Clear the cart
      dispatch(clearCart());

      // Redirect to a confirmation or success page
      router.push("/confirmation");
    } else {
      alert("Veuillez sélectionner une adresse et une méthode de paiement.");
    }
  };

  const handleCancel = () => {
    // Redirect to the deviscrees page
    router.push("/deviscrees");
  };

  if (loading) {
    return <p>Loading addresses...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-4 w-full h-screen flex justify-center flex-col items-center gap-4">
      <h1 className="text-2xl font-bold mb-4">Récapitulatif de la commande</h1>

      {/* RecapProducts Component */}
      <RecapProducts />

      {/* AddressSelection Component */}
      <AddressSelection selectedAddress={selectedAddress} onAddressChange={handleAddressChange} addresses={addresses} />

      {/* PaymentMethodSelection Component */}
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
