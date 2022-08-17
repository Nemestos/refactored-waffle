import { UserCreationDto } from '~/domain/dtos/user-dto'
import User from '~/domain/entities/user'

export default interface SignupUseCase {
  execute(user: UserCreationDto): Promise<User>
}
