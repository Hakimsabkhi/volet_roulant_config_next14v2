import mongoose, { Schema, Document, model } from 'mongoose';

interface IAdresseLivraison extends Document {
  client: mongoose.Types.ObjectId;
  name: string;
  surname: string;
  phoneNumber: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  additionalInfo?: string;
  createdAt: Date;
}

const AdresseLivraisonSchema: Schema = new Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  street: { type: String, required: true },
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  additionalInfo: { type: String }, // Optional additional information like "Building A, Floor 3"
  createdAt: { type: Date, default: Date.now, required: true },
});

// Index to ensure each client can have only one unique address (if required)
AdresseLivraisonSchema.index({ client: 1, street: 1, postalCode: 1 }, { unique: true });

const AdresseLivraison = mongoose.models.AdresseLivraison || model<IAdresseLivraison>('AdresseLivraison', AdresseLivraisonSchema);

export default AdresseLivraison;
