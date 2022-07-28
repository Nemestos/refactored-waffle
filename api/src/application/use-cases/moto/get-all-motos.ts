import GetAllMotoUseCase from '~/application/interfaces/uses-cases/moto/get-all-moto'
import Moto from '~/domain/entities/moto'
import MotoRepository from '~/infrastructure/interfaces/repositories/moto-repository'

export class GetAllMotos implements GetAllMotoUseCase {
  constructor(private readonly motoRepository: MotoRepository) {}
  async execute(): Promise<Moto[]> {
    return await this.motoRepository.getMotos()
  }
}
