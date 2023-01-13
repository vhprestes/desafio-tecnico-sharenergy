import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../interfaces/IUser';

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IUser>('User', UserSchema);
