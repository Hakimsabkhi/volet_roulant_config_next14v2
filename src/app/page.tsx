"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import UserDropdown from "../components/UserDropdown";
import CreateDevisButton from "../components/CreateDevisButton";
import DevisTable from "../components/DevisTable";

interface Devis {
  _id: string;
  DevisNumber: string;
  selectedCoulisseColor: string;
  selectedTablierColor: string;
  selectedLameFinaleColor: string;
  lameSelected: string;
  dimensions: {
    Largeur: number;
    Hauteur: number;
  };
  poseInstalled: string;
  manoeuvreSelected: string;
  commandeManualSelected?: string;
  optionMotorisationSelected: string;
  optionTelecomandeSelected?: string;
  optionInterrupteurSelected?: string;
  sortieDeCableSelected?: string;
  dimensionCost: number;
  totalPrice: number;
  createdAt: Date;
}

const Home: React.FC = () => {
  const { data: session, status } = useSession();
  const [devis, setDevis] = useState<Devis[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/getDevis");
      const data = await response.json();
      setDevis(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch("/api/deleteDevis", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Error deleting data");
      }

      // Remove the deleted item from the state
      setDevis(devis.filter((devisItem) => devisItem._id !== id));
    } catch (error) {
      console.error("Failed to delete data:", error);
    }
  };

  if (status === "loading" || loading) {
    return <p>Loading...</p>; // Show a loading state while the session or data is being fetched
  }

  return (
    <div>
      <h1 className="text-4xl font-bold ml-20 mt-20">Mes Devis</h1>
      <hr className="ml-20 mt-2 w-1/4 border-t-2 border-gray-300" />
      <div className="absolute top-4 right-16 z-[1000] flex gap-4">
        <CreateDevisButton />
        {session ? (
          <UserDropdown
            userName={session.user?.name || "User"}
            userEmail={session.user?.email || "user.email@example.com"}
          />
        ) : (
          <p>Redirecting to sign-in...</p>
        )}
      </div>
      <DevisTable devis={devis} handleDelete={handleDelete} />
    </div>
  );
};

export default Home;
