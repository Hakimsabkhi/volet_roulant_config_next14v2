// src/models/UserCounter.ts
import mongoose, { Schema, Document, model } from 'mongoose';

interface IUserCounter extends Document {
  userId: mongoose.Types.ObjectId;
  count: number;
}

const UserCounterSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  count: { type: Number, default: 0 },
});

const UserCounter = mongoose.models.UserCounter || model<IUserCounter>('UserCounter', UserCounterSchema);

export default UserCounter;
