"use client";

import React from "react";

interface PaymentMethodSelectionProps {
  paymentMethod: string | null;
  onPaymentMethodChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PaymentMethodSelection: React.FC<PaymentMethodSelectionProps> = ({ paymentMethod, onPaymentMethodChange }) => {
  return (
    <div className="w-[800px]">
      <h2 className="text-xl font-semibold mb-2">Méthode de paiement</h2>
      <select
        value={paymentMethod || ""}
        onChange={onPaymentMethodChange}
        className="border p-2 rounded w-full"
      >
        <option value="" disabled>
          Sélectionnez une méthode de paiement
        </option>
        {/* Replace these with dynamic options */}
        <option value="creditCard">Carte de crédit</option>
        <option value="paypal">PayPal</option>
      </select>
    </div>
  );
};

export default PaymentMethodSelection;
