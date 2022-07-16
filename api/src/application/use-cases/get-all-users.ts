import User from '~/domain/entities/user'
import UserRepository from '~/domain/interfaces/repositories/user-repository'
import GetAllUsersUseCase from '~/domain/interfaces/use-cases/user/get-all-users'

export class GetAllUsers implements GetAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(): Promise<User[]> {
    const res = await this.userRepository.getUsers()
    return res
  }
}
