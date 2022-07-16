import User from '~/domain/entities/user'

export interface UserDataSource {
  create(user: User): Promise<boolean>
  getAll(): Promise<User[]>
}
