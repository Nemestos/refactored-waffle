import { mongoose } from '@typegoose/typegoose'
import GetUserByIdUseCase from '~/application/interfaces/uses-cases/user/get-user-by-id'
import User from '~/domain/entities/user'
import { ErrorCode } from '~/domain/errors/error-code'
import { ErrorException } from '~/domain/errors/error-exception'
import UserRepository from '~/infrastructure/interfaces/repositories/user-repository'

export class GetUserById implements GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(id: string): Promise<User | null> {
    try {
      const res = await this.userRepository.findUserById(id)

      return res
    } catch (err) {
      if (err instanceof mongoose.Error.CastError) {
        throw new ErrorException(ErrorCode.NotFoundId, { id, resourceName: 'user' })
      }
      throw err
    }
  }
}
