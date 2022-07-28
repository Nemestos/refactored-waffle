import { UserCreationDto, UserUpdateDto } from '~/domain/dtos/user-dto'
import User from '~/domain/entities/user'

/**
 * handle the connection from data source to expose generic to use case
 */
export default interface UserRepository {
  createUser(user: UserCreationDto): Promise<boolean>
  updateUser(id: string, user: UserUpdateDto): Promise<boolean>
  getUsers(): Promise<User[]>
  findUserByEmail(email: string): Promise<User | null>
  findUserById(id: string): Promise<User | null>
  deleteUserById(id: string): Promise<void>
  userExist(id: string): Promise<boolean>
  usersExists(ids: string[]): Promise<boolean>
}
