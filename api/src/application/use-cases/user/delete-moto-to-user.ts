import DeleteMotoToUserUseCase from '~/application/interfaces/uses-cases/user/delete-moto-to-user'
import { ErrorCode } from '~/domain/errors/error-code'
import { ErrorException } from '~/domain/errors/error-exception'
import MotoRepository from '~/infrastructure/interfaces/repositories/moto-repository'
import UserRepository from '~/infrastructure/interfaces/repositories/user-repository'

export default class DeleteMotoToUser implements DeleteMotoToUserUseCase {
  constructor(private readonly userRepository: UserRepository, private readonly motoRepository: MotoRepository) {}

  async execute(userId: string, motoId: string): Promise<void> {
    try {
      const isUserExist = await this.userRepository.userExist(userId)
      if (!isUserExist) {
        throw new ErrorException(ErrorCode.NotFoundId, { userId, resourceName: 'user' })
      }
    } catch (err) {
      throw new ErrorException(ErrorCode.InvalidId, { userId, resourceName: 'user' })
    }
    try {
      const isMotoExist = await this.motoRepository.motoExist(motoId)
      if (!isMotoExist) {
        throw new ErrorException(ErrorCode.NotFoundId, { motoId, resourceName: 'user/moto' })
      }
    } catch (err) {
      throw new ErrorException(ErrorCode.InvalidId, { motoId, resourceName: 'user/moto' })
    }
    await this.userRepository.deleteMotoToUser(userId, motoId)
  }
}
