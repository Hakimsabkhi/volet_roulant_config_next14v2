"use client";

import { useState, useEffect } from "react";
import AdresseForm from "../../components/AdresseForm";
import LoadingSpinner from "../../components/LoadingSpinner"; // Import the LoadingSpinner

interface Address {
  _id: string;
  name: string;
  surname: string;
  phoneNumber: string;
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
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch existing addresses when the component loads
    const fetchAddresses = async () => {
      try {
        const response = await fetch(`/api/adresse/getadresse`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data: Address[] = await response.json();
          setAddresses(data);
        } else {
          console.error("Failed to fetch addresses");
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
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
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted address from the state
        setAddresses(addresses.filter((address) => address._id !== addressId));
      } else {
        console.error("Failed to delete address");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleFormSave = (savedAddress: Address) => {
    if (currentAddress) {
      // Update the existing address
      setAddresses(
        addresses.map((addr) =>
          addr._id === savedAddress._id ? savedAddress : addr
        )
      );
    } else {
      // Add the new address
      setAddresses([...addresses, savedAddress]);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="w-full items-center p-4 flex flex-col gap-4 justify-center">
      <div className="flex flex-col w-[30%] justify-center">
        <h1 className="text-4xl max-2xl:text-2xl font-bold mb-4 text-center">
          Gérer les adresses
        </h1>
        <button
          onClick={handleAddClick}
          className="nav-btn hover:bg-NavbuttonH uppercase font-bold px-2"
        >
          Ajouter une adresse
        </button>
      </div>

      {loading ? (
  <LoadingSpinner />
) : (
  <div className="mt-4 w-full flex flex-wrap justify-start gap-4">
    {addresses.map((address) => (
      <div
        key={address._id}
        className="bg-white shadow p-4 rounded justify-between flex flex-col w-[32%]"
      >
        <p className="text-lg font-semibold text-gray-800">
          Nom: <span className="font-normal">{address.name}</span>
        </p>
        <p className="text-lg font-semibold text-gray-800">
          Prénom: <span className="font-normal">{address.surname}</span>
        </p>
        <p className="text-lg font-semibold text-gray-800">
          Téléphone: <span className="font-normal">{address.phoneNumber}</span>
        </p>
        <p className="text-lg font-semibold text-gray-800">
          Rue: <span className="font-normal">{address.street}</span>
        </p>
        <p className="text-lg font-semibold text-gray-800">
          Code postal: <span className="font-normal">{address.postalCode}</span>
        </p>
        <p className="text-lg font-semibold text-gray-800">
          Ville: <span className="font-normal">{address.city}</span>
        </p>
        <p className="text-lg font-semibold text-gray-800">
          Pays: <span className="font-normal">{address.country}</span>
        </p>
        {address.additionalInfo && (
          <p className="text-lg font-semibold text-gray-800">
            Informations supplémentaires:{" "}
            <span className="font-normal">{address.additionalInfo}</span>
          </p>
        )}
        <div className="mt-2 flex justify-between">
          <button
            onClick={() => handleModifyClick(address)}
            className="nav-btn hover:bg-NavbuttonH uppercase font-bold px-2"
          >
            Modifier
          </button>
          <button
            onClick={() => handleDeleteClick(address._id)}
            className="nav-btn hover:bg-NavbuttonH uppercase font-bold px-2"
          >
            Supprimer
          </button>
        </div>
      </div>
    ))}
  </div>
)}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <AdresseForm
              existingData={currentAddress}
              onClose={handleFormClose}
              onSave={handleFormSave}
            />
          </div>
        </div>
      )}
    </div>
  );
}
