import { IUser } from './user.types'

export interface IRegisterRequest {
  email: string
  password: string
  firstname: string
  surname: string
}

export interface IRegisterResponse {
  me: IUser
}
export interface ILoginRequest {
  email: string
  password: string
}

export interface ILoginResponse {
  accessToken: string
  me: IUser
}

export type IRefreshResponse = ILoginResponse
export interface IAuthInfo {
  email: string
}
