import UpdateUserUseCase from '~/application/interfaces/uses-cases/user/update-user'
import { UserUpdateDto } from '~/domain/dtos/user-dto'
import { ErrorCode } from '~/domain/errors/error-code'
import { ErrorException } from '~/domain/errors/error-exception'
import UserRepository from '~/infrastructure/interfaces/repositories/user-repository'

export class UpdateUser implements UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string, user: UserUpdateDto): Promise<boolean> {
    try {
      const isExist = await this.userRepository.userExist(id)
      if (!isExist) {
        throw new ErrorException(ErrorCode.NotFoundId, { id, resourceName: 'user' })
      }
    } catch (err) {
      throw new ErrorException(ErrorCode.InvalidId, { id, resourceName: 'user' })
    }

    const res = await this.userRepository.updateUser(id, user)

    return res
  }
}
