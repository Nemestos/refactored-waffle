import { UserCreationDto, UserUpdateDto } from '~/domain/dtos/user-dto'
import User from '~/domain/entities/user'

/**
 * Base user date sources to handle multiples SGBD(mongo,postgres...)
 */
export interface UserDataSource {
  create(user: UserCreationDto): Promise<User>
  addMoto(userId: string, motoId: string): Promise<void>
  deleteMoto(userId: string, motoId: string): Promise<void>
  update(id: string, user: UserUpdateDto): Promise<boolean>
  getAll(): Promise<User[]>
  getById(id: string): Promise<User | null>
  getByEmail(email: string): Promise<User | null>
  deleteById(id: string): void
  userExist(id: string): Promise<boolean>
}
