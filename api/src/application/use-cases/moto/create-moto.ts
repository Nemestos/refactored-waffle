import CreateMotoUseCase from '~/application/interfaces/uses-cases/moto/create-moto'
import { MotoCreationDto } from '~/domain/dtos/moto-dto'
import MotoRepository from '~/infrastructure/interfaces/repositories/moto-repository'

export class CreateMoto implements CreateMotoUseCase {
  constructor(private readonly motoRepository: MotoRepository) {}

  async execute(moto: MotoCreationDto): Promise<boolean> {
    const newMoto = { ...moto } as MotoCreationDto
    return await this.motoRepository.createMoto(newMoto)
  }
}
