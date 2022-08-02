import GetMotoByIdUseCase from '~/application/interfaces/uses-cases/moto/get-moto-by-id'
import Moto from '~/domain/entities/moto'
import { ErrorCode } from '~/domain/errors/error-code'
import { ErrorException } from '~/domain/errors/error-exception'
import MotoRepository from '~/infrastructure/interfaces/repositories/moto-repository'

export class GetMotoById implements GetMotoByIdUseCase {
  constructor(private readonly motoRepository: MotoRepository) {}
  async execute(id: string): Promise<Moto | null> {
    try {
      const isExist = await this.motoRepository.motoExist(id)
      if (!isExist) {
        throw new ErrorException(ErrorCode.NotFoundId, { id, resourceName: 'moto' })
      }
    } catch (err) {
      throw new ErrorException(ErrorCode.InvalidId, { id, resourceName: 'moto' })
    }

    const res = await this.motoRepository.findMotoById(id)

    return res
  }
}
