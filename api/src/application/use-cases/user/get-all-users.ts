import GetAllUsersUseCase from '~/application/interfaces/uses-cases/user/get-all-users'
import User from '~/domain/entities/user'
import UserRepository from '~/infrastructure/interfaces/repositories/user-repository'

export class GetAllUsers implements GetAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(): Promise<User[]> {
    return await this.userRepository.getUsers()
  }
}
