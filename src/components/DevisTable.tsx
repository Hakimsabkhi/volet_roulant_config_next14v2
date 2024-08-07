"use client";
import React from "react";

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
}

interface DevisTableProps {
  devis: Devis[];
  handleDelete: (id: string) => void;
}

const DevisTable: React.FC<DevisTableProps> = ({ devis = [], handleDelete }) => {
  if (!Array.isArray(devis) || devis.length === 0) {
    return <div className="mt-10 ml-20">No devis available</div>;
  }

  return (
    <div className="mt-10 ml-20 flex flex-col gap-3 mb-8">
      {devis.map((devisItem) => (
        <div
          key={devisItem._id}
          className="w-[95%] p-4 flex flex-col gap-6 border rounded-md border-black"
        >
          <h2 className="text-2xl font-bold mb-4">
            Devis Numéro: {devisItem.DevisNumber}
          </h2>
          <table className="w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-sm font-bold ">
                  Type de Lame
                </th>
                <th className="py-2 px-4 border-b text-sm font-bold">
                  Dimensions
                </th>
                <th className="py-2 px-4 border-b text-sm font-bold">
                  Type d&apos;Installation
                </th>
                <th className="py-2 px-4 border-b text-sm font-bold">Couleurs</th>
                <th className="py-2 px-4 border-b text-sm font-bold">
                  Type de Manoeuvre
                </th>
                {devisItem.manoeuvreSelected === "Manuel" && (
                  <th className="py-2 px-4 border-b text-sm font-bold">
                    Outil de commande
                  </th>
                )}
                {devisItem.manoeuvreSelected === "Motorisé" && (
                  <>
                    <th className="py-2 px-4 border-b text-sm font-bold">
                      Type de motorisation
                    </th>
                    {devisItem.optionMotorisationSelected === "Radio" && (
                      <th className="py-2 px-4 border-b text-sm font-bold">
                        Télécommande
                      </th>
                    )}
                    {devisItem.optionMotorisationSelected === "Filaire" && (
                      <>
                        <th className="py-2 px-4 border-b text-sm font-bold">
                          Interrupteur
                        </th>
                        <th className="py-2 px-4 border-b text-sm font-bold">
                          Sortie de cable
                        </th>
                      </>
                    )}
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b border-black text-sm">
                  {devisItem.lameSelected}
                </td>
                <td className="py-2 px-4 border-b border-black text-sm">
                  Largeur: {devisItem.dimensions.Largeur} mm
                  <br />
                  Hauteur: {devisItem.dimensions.Hauteur} mm
                </td>
                <td className="py-2 px-4 border-b text-sm border-black ">
                  {devisItem.poseInstalled}
                </td>
                <td className="py-2 px-4 border-b text-sm border-black ">
                  Coulisse: {devisItem.selectedCoulisseColor}
                  <br /> Tablier: {devisItem.selectedTablierColor}
                  <br /> Lame Finale: {devisItem.selectedLameFinaleColor}
                </td>
                <td className="py-2 px-4 border-b text-sm border-black ">
                  {devisItem.manoeuvreSelected}
                </td>
                {devisItem.manoeuvreSelected === "Manuel" && (
                  <td className="py-2 px-4 border-b text-sm border-black ">
                    {devisItem.commandeManualSelected || "N/A"}
                  </td>
                )}
                {devisItem.manoeuvreSelected === "Motorisé" && (
                  <>
                    <td className="py-2 px-4 border-b text-sm border-black ">
                      {devisItem.optionMotorisationSelected}
                    </td>
                    {devisItem.optionMotorisationSelected === "Radio" && (
                      <td className="py-2 px-4 border-b text-sm border-black ">
                        {devisItem.optionTelecomandeSelected || "N/A"}
                      </td>
                    )}
                    {devisItem.optionMotorisationSelected === "Filaire" && (
                      <>
                        <td className="py-2 px-4 border-b text-sm border-black">
                          {devisItem.optionInterrupteurSelected || "N/A"}
                        </td>
                        <td className="py-2 px-4 border-b text-sm border-black ">
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
                <th className="py-2 px-4 border-b bg-secondary text-sm font-bold ">
                  Total HT
                </th>
                <th className="py-2 px-4 border-b bg-secondary text-sm font-bold">
                  Total TTC
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b text-sm font-bold border-black">
                  {devisItem.totalPrice.toFixed(2)}€
                </td>
                <td className="py-2 px-4 border-b text-sm font-bold border-black">
                  {(devisItem.totalPrice * 1.2).toFixed(2)}€
                </td>
              </tr>
            </tbody>
          </table>
          <table className="w-[45%]">
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b  text-sm font-bold flex gap-5 ">
                  <button className="nav-btn hover:bg-NavbuttonH uppercase font-bold px-2">
                    Valider mon devis
                  </button>
                  <button className="nav-btn hover:bg-NavbuttonH uppercase font-bold px-2">
                    Modifier
                  </button>
                  <button
                    className="nav-btn hover:bg-NavbuttonH uppercase font-bold px-2"
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
  );
};

export default DevisTable;
