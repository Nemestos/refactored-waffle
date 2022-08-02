import { MotoCreationDto, MotoUpdateDto } from '~/domain/dtos/moto-dto'
import Moto from '~/domain/entities/moto'

/**
 * Base moto date sources to handle multiples SGBD(mongo,postgres...)
 */
export interface MotoDataSource {
  create(moto: MotoCreationDto): Promise<boolean>
  update(id: string, moto: MotoUpdateDto): Promise<boolean>
  getAll(): Promise<Moto[]>
  getById(id: string): Promise<Moto | null>
  getByManufacturer(manufacturer: string): Promise<Moto[]>
  deleteById(id: string): void
  motoExist(id: string): Promise<boolean>
}
