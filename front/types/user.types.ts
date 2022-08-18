import { IRegisterUserRequest } from './auth.types'
import { IEntity } from './global.types'
import { IMoto } from './motos.types'

export type IUpdateUserRequest = Partial<Omit<IRegisterUserRequest, 'password'>>

export interface IUser extends IEntity {
  email: string
  firstname: string
  surname: string
  scopes: string[]
  motos: IMoto[]
}
