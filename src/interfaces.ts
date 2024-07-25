// interfaces.ts



// MultiStepMenu

export interface MultiStepMenuProps {
  onSelectionsChange: (selections: any) => void;
}

export interface Selections {
  step1: Record<string, any>;
  step2: Record<string, any>;
  step3: Record<string, any>;
  step4: Record<string, any>;
}

export interface EnabledSteps {
  [key: number]: boolean;
}

export interface StepNavigatorProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
  titles: { [key: number]: string };
  enabledSteps: { [key: number]: boolean };
}

export interface WarningPopupProps {
  message: string;
  onClose: () => void;
}


// couleurVolet

export interface SelectedColor {
  coulisse: string;
  tablier: string;
  lameFinale: string;
}

export interface CouleurVoletProps {
  enableNextButton: (isEnabled: boolean) => void;
  setIsMobileConfigured: (isConfigured: boolean) => void; // Add this line
}

//LameEtDimension

export interface LameEtDimensionProps {
  setSelections: React.Dispatch<React.SetStateAction<any>>;
  selections: any;
  enableNextButton: (isEnabled: boolean) => void;
}

//manoeuvre

export interface ManoeuvreProps {
  enableNextButton: (isEnabled: boolean) => void;
}

// TypeDePose

export interface TypeDePoseProps {
  enableNextButton: (isEnabled: boolean) => void;
};

// InterrupteurSelector

export interface InterrupteurSelectorProps {
  selectedOption: string;
  handleChange: (option: Option) => void;
}

// ManualSelector

export interface ManualSelectorProps {
  selectedOption: string;
  handleChange: (option: Option) => void;
}

// MotoriseSelector

export interface MotoriseSelectorProps {
  selectedOption: string;
  handleChange: (option: Option) => void;
}

export interface StaticImageData {
  src: string;
  height: number;
  width: number;
  placeholder?: string;
}

// OptionSelector

export interface Option {
  label: string;
  image: StaticImageData;
  description?: string;
}

export interface OptionSelectorProps {
  options: Option[];
  selectedOption: string;
  handleChange: (option: Option) => void;
  type: string;
}

// SortieDeCableSelector

export interface SortieDeCableSelectorProps {
  selectedOption: string;
  handleChange: (option: Option) => void;
}

// TelecommandeSelector

export interface TelecommandeSelectorProps {
  selectedOption: string;
  handleChange: (option: Option) => void;
}

// DimensionCostCalculator

export interface Dimensions {
  Largeur: number;
  Hauteur: number;
}

export interface DimensionCostCalculatorProps {
  dimensions: Dimensions;
  onCostCalculated: (cost: number) => void;
}

// TotalCostCalculator

export interface productDetails {
  label: string;
  description: string;
  price: number;
}

// info

export interface InformationProps {
  onClose: () => void;
}

export interface FormData {
  deliveryOption: string;
  fullNameOrCompany: string;
  email: string;
  phoneNumber: string;
  postalCode: string;
  city: string;
  deliveryAddress: string;
}

// PDFExport

export interface Colors {
  coulisse: string;
  tablier: string;
  lameFinale: string;
}

export interface VoletState {
  selectedColor: Colors;
  lameSelected: string;
  dimensions: Dimensions;
  poseInstalled: string;
  manoeuvreSelected: string;
  commandeManualSelected: string;
  optionMotorisationSelected: string;
  optionTelecomandeSelected: string;
  optionInterrupteurSelected: string;
  sortieDeCableSelected: string;
}


export interface RootState {
  volet: VoletState;
}

// APIDataFetcher

export interface APIDataFetcherProps {
  apiClient: any;
}

// CameraPosition

export interface CameraPositionProps {
  position: { x: number; y: number; z: number };
  setPosition: (position: { x: number; y: number; z: number }) => void;
  target: { x: number; y: number; z: number };
  setTarget: (target: { x: number; y: number; z: number }) => void;
}

// LoadingOverlay

export interface LoadingOverlayProps {
  isBlurred: boolean;
  progress: number;
}

// OverlayButtons

export interface OverlayButtonsProps {
  handleViewChange: (
    position: [number, number, number],
    target: [number, number, number],
    duration?: number,
    callback?: (err: any) => void
  ) => void;
}

// TextureUpdateHandler

export interface TextureUpdateHandlerProps {
  apiClient: any;
  textureURL: string;
  textureId: string;
  setTexture: React.Dispatch<React.SetStateAction<string>>;
}

// TextureUpdater

export interface TextureUpdaterProps {
  apiClient: any;
  textureType: keyof SelectedColor;
  textureId: string;
  setTexture: React.Dispatch<React.SetStateAction<string>>;
}


// Viewer


export interface ViewerProps {
  setPosition: (position: { x: number; y: number; z: number }) => void;
  setTarget: (target: { x: number; y: number; z: number }) => void;
}

declare global {
  interface Window {
    Sketchfab: any;
  }
}

// TextureUpdater

export interface TextureUpdaterProps {
  apiClient: any;
  textureType: keyof SelectedColor;
  textureId: string;
  setTexture: React.Dispatch<React.SetStateAction<string>>;
}

// voletSlice

export interface Color {
  coulisse: string;
  tablier: string;
  lameFinale: string;
}


// Data

export interface ColorOptions {
  [key: string]: {
    Blanc: string;
    "Gris-clair": string;
    "Gris-métallique": string;
    "Gris-anthracite": string;
    Marron: string;
    "Chêne-doré": string;
  };
}
