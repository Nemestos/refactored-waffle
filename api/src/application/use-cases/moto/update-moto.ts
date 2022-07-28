import UpdateMotoUseCase from '~/application/interfaces/uses-cases/moto/update-moto'
import { MotoUpdateDto } from '~/domain/dtos/moto-dto'
import MotoRepository from '~/infrastructure/interfaces/repositories/moto-repository'

export class UpdateMoto implements UpdateMotoUseCase {
  constructor(private readonly motoRepository: MotoRepository) {}

  async execute(id: string, moto: MotoUpdateDto): Promise<boolean> {
    const updatedMoto = { ...moto } as MotoUpdateDto
    return await this.motoRepository.updateMoto(id, updatedMoto)
  }
}
