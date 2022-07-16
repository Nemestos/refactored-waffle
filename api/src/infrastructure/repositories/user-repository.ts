import User from '~/domain/entities/user'
import { UserDataSource } from '../interfaces/data-sources/user-ds'
import UserRepository from '../interfaces/repositories/user-repository'

export class UserRepositoryImpl implements UserRepository {
  userDataSource: UserDataSource

  constructor(userDataSource: UserDataSource) {
    this.userDataSource = userDataSource
  }

  async createUser(user: User): Promise<boolean> {
    const res = await this.userDataSource.create(user)
    return res
  }

  async getUsers(): Promise<User[]> {
    const res = await this.userDataSource.getAll()
    return res
  }
}
