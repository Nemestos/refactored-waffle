import { UserCreationDto } from '~/domain/dtos/user-dto'

export default interface SignupUseCase {
  execute(user: UserCreationDto): Promise<boolean>
}
