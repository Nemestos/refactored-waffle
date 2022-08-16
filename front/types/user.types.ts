import { IEntity } from './global.types'
import { IMoto } from './motos.types'

export interface IUser extends IEntity {
  email: string
  firstname: string
  surname: string
  scopes: string[]
  motos: IMoto[]
}
