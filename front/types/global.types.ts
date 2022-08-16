export interface IBasicErrorResponse {
  status: number
  metaData?: string | object
  name: string
}
export interface IBasicSuccessResponse {
  message: string
}
export interface IEntity {
  id: string
  createdAt: string
  updatedAt: string
}
