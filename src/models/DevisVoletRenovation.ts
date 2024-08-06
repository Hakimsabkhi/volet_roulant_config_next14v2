import mongoose, { Schema, Document, model, CallbackError } from 'mongoose';

interface IDevisVoletRenovation extends Document {
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
  DevisNumber: { type: String, unique: true, required: true },
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

// Pre-validate middleware to generate unique DevisNumber
DevisVoletRenovationSchema.pre<IDevisVoletRenovation>('validate', async function (next) {
  if (this.isNew) {
    try {
      const lastDevis = await mongoose.models.DevisVoletRenovation.findOne().sort({ DevisNumber: -1 }).exec();
      const lastDevisNumber = lastDevis ? parseInt(lastDevis.DevisNumber, 10) : 0;
      this.DevisNumber = (lastDevisNumber + 1).toString().padStart(6, '0');
      console.log(`Generated DevisNumber: ${this.DevisNumber}`);
    } catch (error) {
      console.error('Error generating DevisNumber:', error);
      return next(error as CallbackError);
    }
  }
  next();
});

const DevisVoletRenovation = mongoose.models.DevisVoletRenovation || model<IDevisVoletRenovation>('DevisVoletRenovation', DevisVoletRenovationSchema);

export default DevisVoletRenovation;
