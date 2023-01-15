import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/IUser';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  cpf: { type: String, required: true },
  id: { type: String },
});

export default mongoose.model<IUser>('User', userSchema);
