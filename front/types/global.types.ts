export interface IBasicErrorResponse {
  status: number
  metaData?: string | object
  name: string
}
export interface IBasicSuccessResponse {
  message: string
}

export interface IObjectResponse<T> {
  object: string
  data: T
}
export interface IEntity {
  _id: string
  createdAt: string
  updatedAt: string
}
