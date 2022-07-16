import User from '~/domain/entities/user'

export default interface UserDto {
  id?: string
  email: string
  firstname: string
  surname: string
}

export function convertUserToDto(user: User): UserDto {
  return {
    ...user
  }
}
