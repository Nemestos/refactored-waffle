import { getModelForClass } from '@typegoose/typegoose'
import Moto from '~/domain/entities/moto'
export const MotoModel = getModelForClass(Moto, { schemaOptions: { timestamps: true } })
