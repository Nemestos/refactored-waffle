import { UserUpdateDto } from '~/domain/dtos/user-dto'
import User from '~/domain/entities/user'

export default interface UpdateUserUseCase {
  execute(id: string, user: UserUpdateDto): Promise<boolean>
}
