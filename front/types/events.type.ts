import { IEntity } from './global.types'
import { IMoto, MotoCategory } from './motos.types'
import { IUser } from './user.types'
export interface IParticipant {
  user: IUser

  moto: IMoto
}

export interface ICreateEventRequest {
  name: string
  category: MotoCategory
  startDate: string
  endDate: string
}

export type IUpdateEventRequest = ICreateEventRequest

export interface IEvent extends IEntity {
  name: string

  owner: IUser

  participants: IParticipant[]

  category: MotoCategory

  startDate: string
  endDate: string
}
