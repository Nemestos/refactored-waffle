import { MotoUpdateDto } from '~/domain/dtos/moto-dto'

export default interface UpdateMotoUseCase {
  execute(id: string, moto: MotoUpdateDto): Promise<boolean>
}
