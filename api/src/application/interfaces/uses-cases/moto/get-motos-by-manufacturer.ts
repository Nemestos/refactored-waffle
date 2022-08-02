import Moto from '~/domain/entities/moto'

export default interface GetMotoByManufacturerUseCase {
  execute(manufacturer: string): Promise<Moto[]>
}
