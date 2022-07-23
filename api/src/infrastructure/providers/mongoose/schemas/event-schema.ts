import { getModelForClass } from '@typegoose/typegoose'
import Event from '~/domain/entities/event'
export const EventModel = getModelForClass(Event, { schemaOptions: { timestamps: true } })
