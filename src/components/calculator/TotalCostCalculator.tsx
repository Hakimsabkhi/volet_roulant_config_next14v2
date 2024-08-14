import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Information from '../formulaire/info';
import DimensionCostCalculator from './dimensionCostCalculator';
import { productDetails } from "../../interfaces";

import {
  optionsMotorisations,
  optionsInterrupteur,
  optionsTelecomande,
  optionCommandeManuel,
  sortieDeCable,
  optionManoeuvre,
  poseOptions,
  lameChoices
} from '../../assets/Data';

// Import selectors
import {
  selectDimensions,
  selectPoseInstalled,
  selectManoeuvre,
  selectManual,
  selectMotorise,
  selectTelecommande,
  selectInterrupteur,
  selectSortieDeCable,
  selectLameSelected
} from '../../store/voletSlice';


// Helper function to get the price of a selected option
const getPrice = (options: productDetails[], selectedOption: string): number => {
  const option = options.find(option => option.label === selectedOption);
  return option ? option.price : 0;
};

const TotalCostCalculateur: React.FC = () => {
  const dimensions = useSelector(selectDimensions);
  const poseInstalled = useSelector(selectPoseInstalled);
  const manoeuvreSelected = useSelector(selectManoeuvre);
  const commandeManualSelected = useSelector(selectManual);
  const optionMotorisationSelected = useSelector(selectMotorise);
  const optionTelecomandeSelected = useSelector(selectTelecommande);
  const optionInterrupteurSelected = useSelector(selectInterrupteur);
  const sortieDeCableSelected = useSelector(selectSortieDeCable);
  const lameSelected = useSelector(selectLameSelected);

  const [costHT, setCostHT] = useState(''); // Cost excluding VAT
  const [costTTC, setCostTTC] = useState(''); // Cost including VAT
  const [costTotalTTC, setCostTotalTTC] = useState(''); // Total cost including VAT
  const [multiplier, setMultiplier] = useState(1);
  const [showInformation, setShowInformation] = useState(false); // State to control the display of Information component
  const [dimensionCost, setDimensionCost] = useState(0);

  useEffect(() => {
    const calculateCosts = () => {
      const lameSelectedPrice = getPrice(lameChoices, lameSelected);
      const poseInstalledPrice = getPrice(poseOptions, poseInstalled);
      const manoeuvreSelectedPrice = getPrice(optionManoeuvre, manoeuvreSelected);
      const optionMotorisationSelectedPrice = getPrice(optionsMotorisations, optionMotorisationSelected);
      const telecommandePrice = getPrice(optionsTelecomande, optionTelecomandeSelected);
      const interrupteurPrice = getPrice(optionsInterrupteur, optionInterrupteurSelected);
      const sortieDeCablePrice = getPrice(sortieDeCable, sortieDeCableSelected);
      const commandeManualSelectedPrice = getPrice(optionCommandeManuel, commandeManualSelected);

      const additionalCosts = lameSelectedPrice + poseInstalledPrice + manoeuvreSelectedPrice + optionMotorisationSelectedPrice + telecommandePrice + interrupteurPrice + sortieDeCablePrice + commandeManualSelectedPrice;

      const costHT = dimensionCost + additionalCosts;
      const costTTC = costHT * 1.2; // Add 20% VAT to the HT price
      const costTotalTTC = costTTC * multiplier; // Corrected to multiply the total cost including VAT

      setCostHT(costHT.toFixed(2));
      setCostTTC(costTTC.toFixed(2));
      setCostTotalTTC(costTotalTTC.toFixed(2));
    };

    calculateCosts();
  }, [dimensions, multiplier, manoeuvreSelected, dimensionCost, poseInstalled, optionMotorisationSelected, optionTelecomandeSelected, optionInterrupteurSelected, sortieDeCableSelected, lameSelected, commandeManualSelected]);

  const handleIncrement = () => setMultiplier(prev => prev + 1);
  const handleDecrement = () => setMultiplier(prev => Math.max(1, prev - 1));
  const handleCloseInformation = () => setShowInformation(false); // Function to handle closing Information component

  return (
    <div className="WindowConfig max-md:p-[5px]  max-md:hidden">
      <div className="total-cost">
        <h4 className="font-bold text-2xl max-md:text-xl">Prix Total TTC: {costTotalTTC} €</h4>
      </div>    
      <div className="w-full flex gap-[10px] justify-center items-center">
        <div className='flex flex-col w-[60%] max-md:text-xs gap-[10px]'>
          <h2 >Prix unitaire HT : {costHT} €</h2>
          <h2 >Prix unitaire TTC : {costTTC} €</h2>
        </div>
        <div className="flex flex-col gap-[5px] text-center">
          <h2>Quantité</h2>
          <div className="flex gap-[5px]">
            <button className="bg-secondary w-8 h-8 border rounded hover:bg-cwhite hover:text-[#000]" title="Decrease quantity" onClick={handleDecrement}>
              -
            </button>
            <span className='w-8 text-center text-xl'>{multiplier}</span>
            <button className="bg-secondary w-8 h-8 border rounded hover:bg-cwhite hover:text-[#000]" title="Increase quantity" onClick={handleIncrement}>
              +
            </button>
          </div>
        </div>
      </div>

      <DimensionCostCalculator dimensions={dimensions} onCostCalculated={setDimensionCost} />

      {showInformation && <Information onClose={handleCloseInformation} />} 
    </div>
  );
}

export default TotalCostCalculateur;
