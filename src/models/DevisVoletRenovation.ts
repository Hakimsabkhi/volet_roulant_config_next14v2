// src/models/DevisVoletRenovation.ts
import mongoose, { Schema, Document, model, Types } from 'mongoose';

interface IDevisVoletRenovation extends Document {
  user: Types.ObjectId;
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

const DevisVoletRenovationSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  DevisNumber: { type: String, required: true },
  selectedCoulisseColor: { type: String, required: true },
  selectedTablierColor: { type: String, required: true },
  selectedLameFinaleColor: { type: String, required: true },
  lameSelected: { type: String, required: true },
  dimensions: {
    Largeur: { type: Number, required: true },
    Hauteur: { type: Number, required: true },
  },
  poseInstalled: { type: String, required: true },
  manoeuvreSelected: { type: String, required: true },
  commandeManualSelected: { type: String },
  optionMotorisationSelected: { type: String },
  optionTelecomandeSelected: { type: String },
  optionInterrupteurSelected: { type: String },
  sortieDeCableSelected: { type: String },
  dimensionCost: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

// Compound index to ensure DevisNumber is unique for each user
DevisVoletRenovationSchema.index({ user: 1, DevisNumber: 1 }, { unique: true });

const DevisVoletRenovation = mongoose.models.DevisVoletRenovation || model<IDevisVoletRenovation>('DevisVoletRenovation', DevisVoletRenovationSchema);

export default DevisVoletRenovation;
