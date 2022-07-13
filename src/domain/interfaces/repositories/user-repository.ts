import User from '~/domain/entities/user'

export default interface UserRepository {
  createUser(user: User): Promise<boolean>
  getUsers(): Promise<User[]>
}
