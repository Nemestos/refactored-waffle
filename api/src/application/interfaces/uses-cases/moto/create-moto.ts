import { MotoCreationDto } from '~/domain/dtos/moto-dto'

export default interface CreateMotoUseCase {
  execute(moto: MotoCreationDto): Promise<boolean>
}
