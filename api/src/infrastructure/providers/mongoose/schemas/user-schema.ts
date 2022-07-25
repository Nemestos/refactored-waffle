import User from '~/domain/entities/user'
import { getModelForClass } from '@typegoose/typegoose'
export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true } })
