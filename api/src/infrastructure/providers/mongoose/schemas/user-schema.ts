import { model, Schema } from 'mongoose'
import User from '~/domain/entities/user'

const userSchema = new Schema<User>(
  {
    email: { type: String, required: true, index: { unique: true } },
    firstname: { type: String, required: true },
    surname: { type: String, required: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
)
export const UserModel = model<User>('User', userSchema)
