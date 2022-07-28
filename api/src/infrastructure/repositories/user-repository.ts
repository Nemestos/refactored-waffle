import { UserCreationDto, UserUpdateDto } from '~/domain/dtos/user-dto'
import User from '~/domain/entities/user'
import { UserDataSource } from '../interfaces/data-sources/user-ds'
import UserRepository from '../interfaces/repositories/user-repository'

export class UserRepositoryImpl implements UserRepository {
  userDataSource: UserDataSource

  constructor(userDataSource: UserDataSource) {
    this.userDataSource = userDataSource
  }

  async userExist(id: string): Promise<boolean> {
    return await this.userDataSource.userExist(id)
  }

  async usersExists(ids: string[]): Promise<boolean> {
    return await ids.every(async (id) => await this.userExist(id))
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userDataSource.getByEmail(email)
  }

  async createUser(user: UserCreationDto): Promise<boolean> {
    return await this.userDataSource.create(user)
  }

  async updateUser(id: string, user: UserUpdateDto): Promise<boolean> {
    return await this.userDataSource.update(id, user)
  }

  async getUsers(): Promise<User[]> {
    const res = await this.userDataSource.getAll()
    return res
  }

  async findUserById(id: string): Promise<User | null> {
    const res = await this.userDataSource.getById(id)
    return res
  }

  async deleteUserById(id: string): Promise<void> {
    await this.userDataSource.deleteById(id)
  }
}
