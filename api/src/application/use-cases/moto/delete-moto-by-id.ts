import DeleteMotoByIdUseCase from '~/application/interfaces/uses-cases/moto/delete-moto-by-id'
import { ErrorCode } from '~/domain/errors/error-code'
import { ErrorException } from '~/domain/errors/error-exception'
import MotoRepository from '~/infrastructure/interfaces/repositories/moto-repository'

export class DeleteMotoById implements DeleteMotoByIdUseCase {
  constructor(private readonly motoRepository: MotoRepository) {}
  async execute(id: string): Promise<void> {
    try {
      const isExist = await this.motoRepository.motoExist(id)
      if (!isExist) {
        throw new ErrorException(ErrorCode.NotFoundId, { id, resourceName: 'moto' })
      }
    } catch (err) {
      throw new ErrorException(ErrorCode.InvalidId, { id, resourceName: 'moto' })
    }

    await this.motoRepository.deleteMotoById(id)
  }
}
