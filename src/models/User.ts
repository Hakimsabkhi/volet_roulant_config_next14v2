// src/models/User.ts
import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  role: 'SuperAdmin' | 'Admin' | 'Consulter' | 'Visiteur';
  googleId?: string; // Add a field for Google ID
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: {
    type: String,
    enum: ['SuperAdmin', 'Admin', 'Consulter', 'Visiteur'],
    default: 'Visiteur',
  },
  googleId: { type: String, unique: true }, // Add this field to store Google ID
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
