"use client"; // This directive ensures the component is a client component
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import UserDropdown from "../components/UserDropdown"; // Import the new component
import { ConfigIconIcon } from "../assets/imageModule";
import Image from "next/image";
import Link from "next/link";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";

interface Devis {
  _id: string;
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
}

const Home: React.FC = () => {
  const { data: session, status } = useSession();
  const [devis, setDevis] = useState<Devis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchData();
  }, []);

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
    return <p>Loading...</p>; // Show a loading state while the session is being fetched
  }

  return (
    <div>
      <h1 className="text-4xl font-bold ml-20 mt-20">Mes Devis</h1>
      <hr className="ml-20 mt-2 w-1/4 border-t-2 border-gray-300" />
      <div className="absolute top-4 right-16 z-[1000] flex gap-4">
        <Link href="/configurateur">
          <button className="w-fit text-[#fff] hover:text-[#44326E] gap-2 font-bold h-[50px] px-2 bg-none border-none cursor-pointer flex items-center justify-center bg-cbutton shadow-[0_2px_6px_rgba(0,0,0,0.952)] rounded-[4px] transition-shadow duration-300 ease z-[1000] hover:bg-cwhite">
            <Image
              src={ConfigIconIcon}
              alt="Config Icon"
              className="button-icon"
              width={40}
              height={40}
            />
            <p>Créer un devis</p>
          </button>
        </Link>
        {session ? (
          <UserDropdown
            userName={session.user?.name || "User"}
            userEmail={session.user?.email || "user.email@example.com"}
          />
        ) : (
          <p>Redirecting to sign-in...</p>
        )}
      </div>

      <div className="mt-10 ml-20">
        {devis.map((devisItem) => (
          
          <div key={devisItem._id} className="mb-8">
            
            <table className="w-[95%] bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-sm font-bold">Type de Lame</th>
                  <th className="py-2 px-4 border-b text-sm font-bold">Dimensions</th>
                  <th className="py-2 px-4 border-b text-sm font-bold">Type d&apos;Installation</th>
                  <th className="py-2 px-4 border-b text-sm font-bold">Couleurs</th>
                  <th className="py-2 px-4 border-b text-sm font-bold">Type de Manoeuvre</th>
                  {devisItem.manoeuvreSelected === "Manuel" && (
                    <th className="py-2 px-4 border-b text-sm font-bold">Outil de commande</th>
                  )}
                  {devisItem.manoeuvreSelected === "Motorisé" && (
                    <>
                      <th className="py-2 px-4 border-b text-sm font-bold">Type de motorisation</th>
                      {devisItem.optionMotorisationSelected === "Radio" && (
                        <th className="py-2 px-4 border-b text-sm font-bold">Télécommande</th>
                      )}
                      {devisItem.optionMotorisationSelected === "Filaire" && (
                        <>
                          <th className="py-2 px-4 border-b text-sm font-bold">Interrupteur</th>
                          <th className="py-2 px-4 border-b text-sm font-bold">Sortie de cable</th>
                        </>
                      )}
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b">{devisItem.lameSelected}</td>
                  <td className="py-2 px-4 border-b">
                    Largeur: {devisItem.dimensions.Largeur} mm, Hauteur:{" "}
                    {devisItem.dimensions.Hauteur} mm
                  </td>
                  <td className="py-2 px-4 border-b">{devisItem.poseInstalled}</td>
                  <td className="py-2 px-4 border-b">
                    Coulisse: {devisItem.selectedCoulisseColor} / Tablier:{" "}
                    {devisItem.selectedTablierColor} / Lame Finale:{" "}
                    {devisItem.selectedLameFinaleColor}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {devisItem.manoeuvreSelected}
                  </td>
                  {devisItem.manoeuvreSelected === "Manuel" && (
                    <td className="py-2 px-4 border-b">
                      {devisItem.commandeManualSelected || "N/A"}
                    </td>
                  )}
                  {devisItem.manoeuvreSelected === "Motorisé" && (
                    <>
                      <td className="py-2 px-4 border-b">
                        {devisItem.optionMotorisationSelected}
                      </td>
                      {devisItem.optionMotorisationSelected === "Radio" && (
                        <td className="py-2 px-4 border-b">
                          {devisItem.optionTelecomandeSelected || "N/A"}
                        </td>
                      )}
                      {devisItem.optionMotorisationSelected === "Filaire" && (
                        <>
                          <td className="py-2 px-4 border-b">
                            {devisItem.optionInterrupteurSelected || "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {devisItem.sortieDeCableSelected || "N/A"}
                          </td>
                        </>
                      )}
                    </>
                  )}
                </tr>
              </tbody>
            </table>
            <table className="w-[45%]">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b bg-cbutton text-sm font-bold">Total HT</th>
                  <th className="py-2 px-4 border-b bg-cbutton text-sm font-bold">Total TTC</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b text-sm font-bold">
                    {devisItem.totalPrice.toFixed(2)}€
                  </td>
                  <td className="py-2 px-4 border-b text-sm font-bold">
                    {(devisItem.totalPrice * 1.2).toFixed(2)}€
                  </td>
                  <td className="py-2 px-4 border-b  text-sm font-bold">
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="w-[45%]">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b bg-cbutton text-sm font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b  text-sm font-bold flex gap-5 ">
                  <button
                      className="text-red-600 hover:text-red-800"
                  
                    >
                    Valider mon devis
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                
                    >
                    Modifier
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(devisItem._id)}
                    >
                    Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;