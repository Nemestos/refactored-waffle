import { UserCreationDto } from '~/domain/dtos/user-dto'
import User from '~/domain/entities/user'

export default interface UserRepository {
  createUser(user: UserCreationDto): Promise<boolean>
  getUsers(): Promise<User[]>
  findUserByEmail(email: string): Promise<User | null>
}
