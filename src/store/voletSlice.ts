import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VoletState, Dimensions, Colors } from "../interfaces";

const initialState: VoletState = {
  lameSelected: "",
  dimensions: { Largeur: 1000, Hauteur: 1000 },
  selectedColor: {
    coulisse: "",
    tablier: "",
    lameFinale: "",
  },
  poseInstalled: "",
  manoeuvreSelected: "",
  commandeManualSelected: "",
  optionMotorisationSelected: "",
  optionTelecomandeSelected: "",
  optionInterrupteurSelected: "",
  sortieDeCableSelected: "",
};

const voletSlice = createSlice({
  name: "volet",
  initialState,
  reducers: {
    setlameSelected: (state, action: PayloadAction<string>) => {
      state.lameSelected = action.payload;
    },
    setDimensions: (state, action: PayloadAction<Partial<Dimensions>>) => {
      state.dimensions = { ...state.dimensions, ...action.payload };
    },
    setColor: (
      state,
      action: PayloadAction<{ color: string; category: keyof Colors }>
    ) => {
      const { color, category } = action.payload;
      if (category in state.selectedColor) {
        state.selectedColor[category] = color;
      }
    },
    setposeInstalled: (state, action: PayloadAction<string>) => {
      state.poseInstalled = action.payload;
    },
    setmanoeuvreSelected: (state, action: PayloadAction<string>) => {
      state.manoeuvreSelected = action.payload;
    },
    setcommandeManualSelected: (state, action: PayloadAction<string>) => {
      state.commandeManualSelected = action.payload;
    },
    setoptionMotorisationSelected: (state, action: PayloadAction<string>) => {
      state.optionMotorisationSelected = action.payload;
    },
    setoptionTelecomandeSelected: (state, action: PayloadAction<string>) => {
      state.optionTelecomandeSelected = action.payload;
    },
    setoptionInterrupteurSelected: (state, action: PayloadAction<string>) => {
      state.optionInterrupteurSelected = action.payload;
    },
    setsortieDeCableSelected: (state, action: PayloadAction<string>) => {
      state.sortieDeCableSelected = action.payload;
    },
  },
});

export const {
  setlameSelected,
  setDimensions,
  setColor,
  setposeInstalled,
  setmanoeuvreSelected,
  setcommandeManualSelected,
  setoptionMotorisationSelected,
  setoptionTelecomandeSelected,
  setoptionInterrupteurSelected,
  setsortieDeCableSelected,
} = voletSlice.actions;

export const selectlameSelected = (state: { volet: VoletState }) =>
  state.volet.lameSelected;
export const selectposeInstalled = (state: { volet: VoletState }) =>
  state.volet.poseInstalled;
export const selectSelectedColor = (state: { volet: VoletState }) =>
  state.volet.selectedColor;
export const selectDimensions = (state: { volet: VoletState }) =>
  state.volet.dimensions;
export const selectColorForCategory =
  (category: keyof Colors) =>
  (state: { volet: VoletState }): string =>
    state.volet.selectedColor[category];
export const selectManoeuvre = (state: { volet: VoletState }) =>
  state.volet.manoeuvreSelected;
export const selectManual = (state: { volet: VoletState }) =>
  state.volet.commandeManualSelected;
export const selectMotorise = (state: { volet: VoletState }) =>
  state.volet.optionMotorisationSelected;
export const selectTelecommande = (state: { volet: VoletState }) =>
  state.volet.optionTelecomandeSelected;
export const selectInterrupteur = (state: { volet: VoletState }) =>
  state.volet.optionInterrupteurSelected;
export const selectSortieDeCable = (state: { volet: VoletState }) =>
  state.volet.sortieDeCableSelected;

export default voletSlice.reducer;
