import { MotoCreationDto, MotoUpdateDto } from '~/domain/dtos/moto-dto'
import Moto from '~/domain/entities/moto'

/**
 * handle the connection from data source to expose generic to use case
 */
export default interface MotoRepository {
  createMoto(moto: MotoCreationDto): Promise<boolean>
  updateMoto(id: string, moto: MotoUpdateDto): Promise<boolean>
  getMotos(): Promise<Moto[]>
  findMotoById(id: string): Promise<Moto | null>
  findMotosByManufacturer(manufacturer: string): Promise<Moto[]>
  deleteMotoById(id: string): Promise<void>
  motoExist(id: string): Promise<boolean>
}
