import GetMotosByManufacturerUseCase from '~/application/interfaces/uses-cases/moto/get-motos-by-manufacturer'
import Moto from '~/domain/entities/moto'
import MotoRepository from '~/infrastructure/interfaces/repositories/moto-repository'

export class GetMotosByManufacturer implements GetMotosByManufacturerUseCase {
  constructor(private readonly motoRepository: MotoRepository) {}
  async execute(manufacturer: string): Promise<Moto[]> {
    const res = await this.motoRepository.findMotosByManufacturer(manufacturer)

    return res
  }
}
