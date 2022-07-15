import User from '../entities/user'
import UserRepository from '../interfaces/repositories/user-repository'
import GetAllUsersUseCase from '../interfaces/use-cases/user/get-all-users'

export class GetAllUsers implements GetAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(): Promise<User[]> {
    const res = await this.userRepository.getUsers()
    return res
  }
}
