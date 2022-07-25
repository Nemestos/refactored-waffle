import { UserCreationDto } from '~/domain/dtos/user-dto'
import User from '~/domain/entities/user'

export interface UserDataSource {
  create(user: UserCreationDto): Promise<boolean>
  getAll(): Promise<User[]>
  getByEmail(email: string): Promise<User | null>
  getById(id: string): Promise<User | null>
}
