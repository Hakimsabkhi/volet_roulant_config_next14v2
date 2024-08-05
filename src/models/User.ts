import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;