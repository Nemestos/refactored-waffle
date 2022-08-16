export interface IRegisterRequest {
  email: string
  password: string
  firstname: string
  surname: string
}
export interface ILoginRequest {
  email: string
  password: string
}

export interface ILoginResponse {
  accessToken: string
}
export type IRefreshResponse = ILoginResponse
export interface IAuthInfo {
  email: string
}
