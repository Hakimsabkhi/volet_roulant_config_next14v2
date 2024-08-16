"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setVoletFromDevis } from "@/store/voletSlice";
import { format } from "date-fns"; // Import date-fns for date formatting
import { Devis } from "@/interfaces";
// src/interfaces/types.ts





interface DevisTableProps {
  devis: Devis[];
  handleDelete: (id: string) => void;
}

const DevisTable: React.FC<DevisTableProps> = ({
  devis = [],
  handleDelete,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleModify = (id: string) => {
    const selectedDevis = devis.find((devisItem) => devisItem._id === id);
    if (selectedDevis) {
      dispatch(
        setVoletFromDevis({
          lameSelected: selectedDevis.lameSelected,
          dimensions: selectedDevis.dimensions,
          selectedColor: {
            coulisse: selectedDevis.selectedCoulisseColor,
            tablier: selectedDevis.selectedTablierColor,
            lameFinale: selectedDevis.selectedLameFinaleColor,
          },
          poseInstalled: selectedDevis.poseInstalled,
          manoeuvreSelected: selectedDevis.manoeuvreSelected,
          commandeManualSelected: selectedDevis.commandeManualSelected || "",
          optionMotorisationSelected: selectedDevis.optionMotorisationSelected,
          optionTelecomandeSelected: selectedDevis.optionTelecomandeSelected || "",
          optionInterrupteurSelected: selectedDevis.optionInterrupteurSelected || "",
          sortieDeCableSelected: selectedDevis.sortieDeCableSelected || "",
          multiplier: selectedDevis.multiplier, // Include multiplier
        })
      );
      router.push(`/configurateur?id=${id}`);
    }
  };
  

  if (devis.length === 0) {
    return <div>No devis available</div>;
  }

  return (
    <div className="flex flex-col gap-3 mb-8 items-center w-full">
      {devis.map((devisItem) => (
        <div
          key={devisItem._id}
          className="w-full p-4 flex flex-col gap-6 border rounded-md border-black"
        >
          <div className="flex justify-between">
            <h2 className="text-xl font-bold mb-4">
              Devis Numéro: {devisItem.DevisNumber}
            </h2>
            <p className="text-xl">
              Date de creation:{" "}
              {format(new Date(devisItem.createdAt), "dd/MM/yyyy")}
            </p>
          </div>
          <table className="w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-sm font-bold">
                  Type de Lame
                </th>
                <th className="py-2 px-4 border-b text-sm font-bold">
                  Dimensions
                </th>
                <th className="py-2 px-4 border-b text-sm font-bold">
                  Type d&apos;Installation
                </th>
                <th className="py-2 px-4 border-b text-sm font-bold">
                  Couleurs
                </th>
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
                <td className="py-2 px-4 border-b text-sm border-black">
                  {devisItem.poseInstalled}
                </td>
                <td className="py-2 px-4 border-b text-sm border-black">
                  Coulisse: {devisItem.selectedCoulisseColor}
                  <br /> Tablier: {devisItem.selectedTablierColor}
                  <br /> Lame Finale: {devisItem.selectedLameFinaleColor}
                </td>
                <td className="py-2 px-4 border-b text-sm border-black">
                  {devisItem.manoeuvreSelected}
                </td>
                {devisItem.manoeuvreSelected === "Manuel" && (
                  <td className="py-2 px-4 border-b text-sm border-black">
                    {devisItem.commandeManualSelected || "N/A"}
                  </td>
                )}
                {devisItem.manoeuvreSelected === "Motorisé" && (
                  <>
                    <td className="py-2 px-4 border-b text-sm border-black">
                      {devisItem.optionMotorisationSelected}
                    </td>
                    {devisItem.optionMotorisationSelected === "Radio" && (
                      <td className="py-2 px-4 border-b text-sm border-black">
                        {devisItem.optionTelecomandeSelected || "N/A"}
                      </td>
                    )}
                    {devisItem.optionMotorisationSelected === "Filaire" && (
                      <>
                        <td className="py-2 px-4 border-b text-sm border-black">
                          {devisItem.optionInterrupteurSelected || "N/A"}
                        </td>
                        <td className="py-2 px-4 border-b text-sm border-black">
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
    <th className="py-2 px-4 border-b bg-secondary text-sm font-bold">
        Nombres d&apos;unités
      </th>
      <th className="py-2 px-4 border-b bg-secondary text-sm font-bold">
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
        {devisItem.multiplier}
      </td>
      <td className="py-2 px-4 border-b text-sm font-bold border-black">
        {`${devisItem.totalPrice.toFixed(2)} * ${devisItem.multiplier} = ${(devisItem.totalPrice * devisItem.multiplier).toFixed(2)}€`}
      </td>
      <td className="py-2 px-4 border-b text-sm font-bold border-black">
        {(devisItem.totalPrice * devisItem.multiplier * 1.2).toFixed(2)}€
      </td>
    </tr>
  </tbody>
</table>

          <table className="w-full">
            <tbody>
              <tr className="flex justify-between">
                <td className="w-[45%] py-2 px-4 border-b text-sm font-bold flex gap-5">
                  <button className="nav-btn hover:bg-NavbuttonH uppercase font-bold px-2">
                    Ajouter un Adresse
                  </button>
                  <button
                    className="nav-btn hover:bg-NavbuttonH uppercase font-bold px-2"
                    onClick={() => handleModify(devisItem._id)}
                  >
                    Modifier
                  </button>
                  <button
                    className="nav-btn hover:bg-NavbuttonH uppercase font-bold px-2"
                    onClick={() => handleDelete(devisItem._id)}
                  >
                    Delete
                  </button>
                </td>
                <td className="w-[20%] py-2 px-4 border-b text-sm font-bold flex gap-5">
                  <button className="nav-btn hover:bg-NavbuttonH uppercase font-bold px-2">
                    Approuvés mon devis
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
