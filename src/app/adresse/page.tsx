"use client"

import { useState, useEffect } from 'react';
import AdresseForm from '../../components/AdresseForm';

interface Address {
  _id: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  additionalInfo?: string;
}

export default function AdressePage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);

  useEffect(() => {
    // Fetch existing addresses when the component loads
    const fetchAddresses = async () => {
      try {
        const response = await fetch('/api/adresse/save', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data: Address[] = await response.json();
          setAddresses(data);
        } else {
          console.error('Failed to fetch addresses');
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchAddresses();
  }, []);

  const handleAddClick = () => {
    setCurrentAddress(null); // Reset form for new address
    setIsFormOpen(true);
  };

  const handleModifyClick = (address: Address) => {
    setCurrentAddress(address); // Load existing address into form
    setIsFormOpen(true);
  };

  const handleDeleteClick = async (addressId: string) => {
    try {
      const response = await fetch(`/api/adresse/delete/${addressId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted address from the state
        setAddresses(addresses.filter((address) => address._id !== addressId));
      } else {
        console.error('Failed to delete address');
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleFormSave = (savedAddress: Address) => {
    if (currentAddress) {
      // Update the existing address
      setAddresses(addresses.map((addr) => (addr._id === savedAddress._id ? savedAddress : addr)));
    } else {
      // Add the new address
      setAddresses([...addresses, savedAddress]);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Address</h1>
      <button
        onClick={handleAddClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Add Address
      </button>

      <div className="mt-4">
        {addresses.map((address) => (
          <div key={address._id} className="bg-white shadow p-4 rounded mb-4">
            <p>{address.street}, {address.city}, {address.postalCode}, {address.country}</p>
            <div className="mt-2">
              <button
                onClick={() => handleModifyClick(address)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition mr-2"
              >
                Modify
              </button>
              <button
                onClick={() => handleDeleteClick(address._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <AdresseForm existingData={currentAddress} onClose={handleFormClose} onSave={handleFormSave} />
          </div>
        </div>
      )}
    </div>
  );
}
