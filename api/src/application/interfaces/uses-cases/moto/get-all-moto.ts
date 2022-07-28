import Moto from '~/domain/entities/moto'

export default interface GetAllMotoUseCase {
  execute(): Promise<Moto[]>
}
