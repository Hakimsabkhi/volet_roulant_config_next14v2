import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation"; // Import useRouter and useSearchParams
import DimensionCostCalculator from "./calculator/dimensionCostCalculator";
import {
  optionsMotorisations,
  optionsInterrupteur,
  optionsTelecomande,
  optionCommandeManuel,
  sortieDeCable,
  optionManoeuvre,
  poseOptions,
  lameChoices,
} from "../assets/Data";
import { RootState } from "../store";

const getPrice = (options: any[], selectedOption: string) => {
  const option = options.find((option) => option.label === selectedOption);
  return option ? option.price : 0;
};

const MultiStepInfoDisplay: React.FC = () => {
  const [dimensionCost, setDimensionCost] = useState(0);
  const [devisId, setDevisId] = useState<string | null>(null);
  const router = useRouter(); // Initialize useRouter
  const searchParams = useSearchParams(); // Use useSearchParams to get query parameters
  
  const selectedCoulisseColor = useSelector(
    (state: RootState) => state.volet.selectedColor.coulisse
  );
  const selectedTablierColor = useSelector(
    (state: RootState) => state.volet.selectedColor.tablier
  );
  const selectedLameFinaleColor = useSelector(
    (state: RootState) => state.volet.selectedColor.lameFinale
  );
  const lameSelected = useSelector(
    (state: RootState) => state.volet.lameSelected
  );
  const dimensions = useSelector((state: RootState) => state.volet.dimensions);
  const poseInstalled = useSelector(
    (state: RootState) => state.volet.poseInstalled
  );
  const manoeuvreSelected = useSelector(
    (state: RootState) => state.volet.manoeuvreSelected
  );
  const commandeManualSelected = useSelector(
    (state: RootState) => state.volet.commandeManualSelected
  );
  const optionMotorisationSelected = useSelector(
    (state: RootState) => state.volet.optionMotorisationSelected
  );
  const optionTelecomandeSelected = useSelector(
    (state: RootState) => state.volet.optionTelecomandeSelected
  );
  const optionInterrupteurSelected = useSelector(
    (state: RootState) => state.volet.optionInterrupteurSelected
  );
  const sortieDeCableSelected = useSelector(
    (state: RootState) => state.volet.sortieDeCableSelected
  );

  const lameSelectedPrice = getPrice(lameChoices, lameSelected);
  const poseInstalledPrice = getPrice(poseOptions, poseInstalled);
  const manoeuvreSelectedPrice = getPrice(optionManoeuvre, manoeuvreSelected);
  const optionMotorisationSelectedPrice = getPrice(
    optionsMotorisations,
    optionMotorisationSelected
  );
  const telecommandePrice = getPrice(
    optionsTelecomande,
    optionTelecomandeSelected
  );
  const interrupteurPrice = getPrice(
    optionsInterrupteur,
    optionInterrupteurSelected
  );
  const sortieDeCablePrice = getPrice(sortieDeCable, sortieDeCableSelected);
  const commandeManualSelectedPrice = getPrice(
    optionCommandeManuel,
    commandeManualSelected
  );

  const totalPrice =
    lameSelectedPrice +
    poseInstalledPrice +
    manoeuvreSelectedPrice +
    optionMotorisationSelectedPrice +
    telecommandePrice +
    interrupteurPrice +
    sortieDeCablePrice +
    commandeManualSelectedPrice +
    dimensionCost;

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setDevisId(id);
      console.log("Devis ID:", id);
    }
  }, [searchParams]);

  const handleSubmit = async () => {
    // Data for creating a new devis
    const data = {
      selectedCoulisseColor,
      selectedTablierColor,
      selectedLameFinaleColor,
      lameSelected,
      dimensions,
      poseInstalled,
      manoeuvreSelected,
      commandeManualSelected,
      optionMotorisationSelected,
      optionTelecomandeSelected,
      optionInterrupteurSelected,
      sortieDeCableSelected,
      dimensionCost,
      totalPrice,
    };

    console.log("Submitting data:", data);

    if (
      !selectedCoulisseColor ||
      !selectedTablierColor ||
      !selectedLameFinaleColor ||
      !lameSelected ||
      !dimensions ||
      !poseInstalled ||
      !manoeuvreSelected ||
      !dimensionCost ||
      !totalPrice
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch("/api/saveData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error saving data");
      }

      alert("Data saved successfully!");
      router.push("/"); // Redirect to home page after saving data
    } catch (error) {
      console.error(error);
      alert("Failed to save data");
    }
  };

  const handleSaveChanges = async () => {
    if (!devisId) {
      alert("Devis ID is missing. Unable to update.");
      return;
    }

    const data = {
      id: devisId,
      selectedCoulisseColor,
      selectedTablierColor,
      selectedLameFinaleColor,
      lameSelected,
      dimensions,
      poseInstalled,
      manoeuvreSelected,
      commandeManualSelected,
      optionMotorisationSelected,
      optionTelecomandeSelected,
      optionInterrupteurSelected,
      sortieDeCableSelected,
      dimensionCost,
      totalPrice,
    };

    console.log("Submitting data:", data);

    if (
      !selectedCoulisseColor ||
      !selectedTablierColor ||
      !selectedLameFinaleColor ||
      !lameSelected ||
      !dimensions ||
      !poseInstalled ||
      !manoeuvreSelected ||
      !dimensionCost ||
      !totalPrice
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch("/api/updateDevis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error updating data");
      }

      alert("Changes saved successfully!");
      router.push("/"); // Redirect to home page after saving changes
    } catch (error) {
      console.error(error);
      alert("Failed to save changes");
    }
  };

  return (
    <div className="flex flex-col text-left gap-[10px] font-normal">
      <table>
        <tbody>
          <tr>
            <th>Type de Lame</th>
            <td>{lameSelected}</td>
            <td>{lameSelectedPrice}€</td>
          </tr>
          <tr>
            <th>Dimensions</th>
            <td>
              Largeur: {dimensions.Largeur} mm, Hauteur: {dimensions.Hauteur} mm
            </td>
            <td>{dimensionCost.toFixed(2)}€</td>
          </tr>
          <tr>
            <th>Type d&apos;Installation</th>
            <td>{poseInstalled}</td>
            <td>{poseInstalledPrice}€</td>
          </tr>
          <tr>
            <th>Couleurs</th>
            <td>
              Coulisse: {selectedCoulisseColor} / Tablier:{selectedTablierColor}{" "}
              / Lame Finale:{selectedLameFinaleColor}
            </td>
            <td>30€</td>
          </tr>
          <tr>
            <th>Type de Manoeuvre</th>
            <td>{manoeuvreSelected}</td>
            <td>{manoeuvreSelectedPrice}€</td>
          </tr>
          {manoeuvreSelected === "Manuel" && (
            <tr>
              <th>Outil de commande</th>
              <td>{commandeManualSelected}</td>
              <td>{commandeManualSelectedPrice}€</td>
            </tr>
          )}
          {manoeuvreSelected === "Motorisé" && (
            <>
              <tr>
                <th>Type de motorisation</th>
                <td>{optionMotorisationSelected}</td>
                <td>{optionMotorisationSelectedPrice}€</td>
              </tr>
              {optionMotorisationSelected === "Radio" && (
                <tr>
                  <th>Télécommande</th>
                  <td>{optionTelecomandeSelected}</td>
                  <td>{telecommandePrice}€</td>
                </tr>
              )}
              {optionMotorisationSelected === "Filaire" && (
                <>
                  <tr>
                    <th>Interrupteur</th>
                    <td>{optionInterrupteurSelected}</td>
                    <td>{interrupteurPrice}€</td>
                  </tr>
                  <tr>
                    <th>Sortie de cable</th>
                    <td>{sortieDeCableSelected}</td>
                    <td>{sortieDeCablePrice}€</td>
                  </tr>
                </>
              )}
            </>
          )}
        </tbody>
      </table>
      <table className="w-[60%] text-right ml-auto mr-0">
        <tbody>
          <tr>
            <th>Total HT</th>
            <td className="price">{totalPrice.toFixed(2)}€</td>
          </tr>
          <tr>
            <th>Total TTC</th>
            <td className="price">{(totalPrice * 1.2).toFixed(2)}€</td>
          </tr>
        </tbody>
      </table>

      <DimensionCostCalculator
        dimensions={dimensions}
        onCostCalculated={setDimensionCost}
      />

      {/* Conditionally render the appropriate button */}
      {devisId ? (
        <button onClick={handleSaveChanges} className="nav-btn hover:bg-NavbuttonH uppercase font-bold px-2">
          Save Changes
        </button>
      ) : (
        <button onClick={handleSubmit} className="nav-btn hover:bg-NavbuttonH uppercase font-bold px-2">
          sauvegarde mon devis et quitter
        </button>
      )}
    </div>
  );
};

export default MultiStepInfoDisplay;
