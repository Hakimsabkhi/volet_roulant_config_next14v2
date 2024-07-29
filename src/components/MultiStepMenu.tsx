import React, { useState, useEffect, useCallback } from "react";
import StepNavigator from "./stepNavigator";
import Manoeuvre from "./steps/manoeuvre";
import LameEtDimension from "./steps/LameEtdimension";
import CouleurVolet from "./steps/couleurVolet";
import TypeDePose from "./steps/typeDePose";
import MultiStepInfoDisplay from "./MultiStepInfoDisplay";
import TotalCostCalculateur from "./calculator/TotalCostCalculator";
import Information from "./formulaire/info";
import WarningPopup from "./WarningPopup";
import { MultiStepMenuProps, Selections, EnabledSteps } from "../interfaces"; // Import interfaces

const MultiStepMenu: React.FC<MultiStepMenuProps> = ({
  onSelectionsChange,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState<Selections>({
    step1: {},
    step2: {},
    step3: {},
    step4: {},
  });
  const [showInformation, setShowInformation] = useState(false);
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);
  const [enabledSteps, setEnabledSteps] = useState<EnabledSteps>({ 1: true });
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const [isMobileConfigured, setIsMobileConfigured] = useState(false);

  useEffect(() => {
    onSelectionsChange(selections);
  }, [selections, onSelectionsChange]);

  const steps = [
    { id: 1, title: "Type de pose", Component: TypeDePose },
    { id: 2, title: "Lame et Dimension", Component: LameEtDimension },
    { id: 3, title: "Couleurs", Component: CouleurVolet },
    { id: 4, title: "Manoeuvre", Component: Manoeuvre },
    { id: 5, title: "Recap de votre produit", Component: MultiStepInfoDisplay },
  ];

  const enableNextButton = useCallback(
    (isEnabled: boolean) => {
      setIsNextButtonEnabled(isEnabled);
      setEnabledSteps((prev) => ({
        ...prev,
        [currentStep + 1]: isEnabled,
      }));
    },
    [currentStep]
  );

  const enhancedSetCurrentStep = (step: number) => {
    if (enabledSteps[step]) {
      setCurrentStep(step);
      setShowInformation(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      if (isNextButtonEnabled) {
        setCurrentStep((prevStep) => prevStep + 1);
      } else {
        setShowWarningPopup(true);
      }
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const modifyProduct = () => {
    setCurrentStep(1);
    setShowInformation(false);
  };

  const toggleInformationDisplay = () => {
    setShowInformation(!showInformation);
  };

  const closeWarningPopup = () => {
    setShowWarningPopup(false);
  };

  const renderCurrentStep = () => {
    const current = steps.find((step) => step.id === currentStep);
    if (current) {
      const StepComponent = current.Component;
      return (
        <StepComponent
          setSelections={setSelections}
          selections={selections}
          enableNextButton={enableNextButton}
          setIsMobileConfigured={setIsMobileConfigured} // Pass it here
        />
      );
    }
    return null;
  };

  const stepsForNavigator = steps.filter((step) => step.id !== 5);

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="WindowConfig max-md:hidden">
        <h1 className="font-semibold uppercase">Volet roulant rénovation sur mesure</h1>
        <StepNavigator
          currentStep={currentStep}
          setCurrentStep={enhancedSetCurrentStep}
          totalSteps={stepsForNavigator.length}
          titles={stepsForNavigator.reduce(
            (acc, step) => ({ ...acc, [step.id]: step.title }),
            {}
          )}
          enabledSteps={enabledSteps}
        />
      </div>
      <div className="WindowConfig max-md:p-[5px] max-md:min-h-[200px]">
      <h2 className="text-base uppercase font-semibold">{steps.find((step) => step.id === currentStep)?.title}</h2>
        <div className="w-full flex flex-col gap-[5px] max-md:min-h-[100px] ">
          {renderCurrentStep()}
        </div>
        <div className="w-full flex gap-[10px] max-md:text-[2px]">
          {currentStep > 1 && currentStep < steps.length && (
            <button onClick={previousStep} className="nav-btn previous hover:bg-NavbuttonH">
              Étape Précédente
            </button>
          )}
          {currentStep < steps.length && currentStep !== steps.length && (
            (isNextButtonEnabled || (isMobileConfigured && isNextButtonEnabled)) && (
              <button onClick={nextStep} className="nav-btn hover:bg-NavbuttonH ">
                {currentStep === steps.length - 1
                  ? "Finaliser"
                  : "Étape Suivante"}
              </button>            
            )
          )}
        
          {currentStep === steps.length && (
            <>
              <button onClick={modifyProduct} className="nav-btn hover:bg-NavbuttonH max-md:text-xs">
                Modifier mon produit
              </button>
              <button onClick={toggleInformationDisplay} className="nav-btn hover:bg-NavbuttonH max-md:text-xs">
                Recevoir mon devis
              </button>
            </>
          )}
        </div>
      </div>
      {showInformation && <Information onClose={toggleInformationDisplay} />}
      <TotalCostCalculateur />
      {showWarningPopup && (
        <WarningPopup
          message="Encore des options doivent être sélectionnées avant de passer à l'étape suivante!"
          onClose={closeWarningPopup}
        />
      )}
    </div>
  );
};

export default MultiStepMenu;
