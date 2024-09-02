// src/models/User.ts
import mongoose, { Document, Schema, Model } from 'mongoose';

export interface CartItem {
  id: string;
  devisNumber: string;
  totalHT: number;
  totalTTC: number;
  quantity: number;
}

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  role: 'SuperAdmin' | 'Admin' | 'Consulter' | 'Visiteur';
  googleId?: string; // Field for Google ID
  cart: CartItem[]; // Field for storing user's cart items
}

const CartItemSchema: Schema = new Schema({
  id: { type: String, required: true },
  devisNumber: { type: String, required: true },
  totalHT: { type: Number, required: true },
  totalTTC: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: {
    type: String,
    enum: ['SuperAdmin', 'Admin', 'Consulter', 'Visiteur'],
    default: 'Visiteur',
  },
  googleId: { type: String, unique: true }, // Field to store Google ID
  cart: {
    type: [CartItemSchema], // Array of CartItemSchema to store cart items
    default: [],
  },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
