import { IUser } from './user.types'

export interface IRegisterUserRequest {
  email: string
  password: string
  firstname: string
  surname: string
}

export interface IRegisterUserResponse {
  me: IUser
}
export interface ILoginUserRequest {
  email: string
  password: string
}

export interface ILoginUserResponse {
  accessToken: string
  me: IUser
}

export type IRefreshResponse = ILoginUserResponse
export interface IAuthInfo {
  email: string
}
