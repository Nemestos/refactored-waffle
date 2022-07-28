import { MotoCreationDto, MotoUpdateDto } from '~/domain/dtos/moto-dto'
import Moto from '~/domain/entities/moto'
import { MotoDataSource } from '../interfaces/data-sources/moto-ds'
import MotoRepository from '../interfaces/repositories/moto-repository'

export class MotoRepositoryImpl implements MotoRepository {
  motoDataSource: MotoDataSource

  constructor(motoDataSource: MotoDataSource) {
    this.motoDataSource = motoDataSource
  }

  async motoExist(id: string): Promise<boolean> {
    return await this.motoDataSource.motoExist(id)
  }

  async createMoto(Moto: MotoCreationDto): Promise<boolean> {
    return await this.motoDataSource.create(Moto)
  }

  async updateMoto(id: string, Moto: MotoUpdateDto): Promise<boolean> {
    return await this.motoDataSource.update(id, Moto)
  }

  async getMotos(): Promise<Moto[]> {
    const res = await this.motoDataSource.getAll()
    return res
  }

  async findMotoById(id: string): Promise<Moto | null> {
    const res = await this.motoDataSource.getById(id)
    return res
  }

  async findMotosByManufacturer(manufacturer: string): Promise<Moto[]> {
    const res = await this.motoDataSource.getByManufacturer(manufacturer)
    return res
  }

  async deleteMotoById(id: string): Promise<void> {
    await this.motoDataSource.deleteById(id)
  }
}
