import { UserCreationDto } from '~/domain/dtos/user-dto'
import User from '~/domain/entities/user'
import { UserDataSource } from '../interfaces/data-sources/user-ds'
import UserRepository from '../interfaces/repositories/user-repository'

export class UserRepositoryImpl implements UserRepository {
  userDataSource: UserDataSource

  constructor(userDataSource: UserDataSource) {
    this.userDataSource = userDataSource
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userDataSource.getByEmail(email)
  }

  async createUser(user: UserCreationDto): Promise<boolean> {
    return await this.userDataSource.create(user)
  }

  async getUsers(): Promise<User[]> {
    const res = await this.userDataSource.getAll()
    return res
  }
}
