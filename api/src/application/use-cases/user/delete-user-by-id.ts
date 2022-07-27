import { mongoose } from '@typegoose/typegoose'
import DeleteUserByIdUseCase from '~/application/interfaces/uses-cases/user/delete-user-by-id'
import { ErrorCode } from '~/domain/errors/error-code'
import { ErrorException } from '~/domain/errors/error-exception'
import UserRepository from '~/infrastructure/interfaces/repositories/user-repository'

export class DeleteUserById implements DeleteUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(id: string): Promise<void> {
    try {
      const isExist = await this.userRepository.userExist(id)
      if (!isExist) {
        throw new ErrorException(ErrorCode.NotFoundId, { id, resourceName: 'user' })
      }
    } catch (err) {
      throw new ErrorException(ErrorCode.InvalidId, { id, resourceName: 'user' })
    }
    try {
      await this.userRepository.deleteUserById(id)
    } catch (err) {
      if (err instanceof mongoose.Error.CastError) {
        throw new ErrorException(ErrorCode.NotFoundId, { id, resourceName: 'user' })
      }
      throw err
    }
  }
}
