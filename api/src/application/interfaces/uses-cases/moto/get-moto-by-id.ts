import Moto from '~/domain/entities/moto'

export default interface GetMotoByIdUseCase {
  execute(id: string): Promise<Moto | null>
}
