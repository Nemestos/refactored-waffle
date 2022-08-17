import { UserSigninDto } from '~/domain/dtos/user-dto'
import User from '~/domain/entities/user'

export default interface SigninUseCase {
  execute(user: UserSigninDto): Promise<[string, string, User]>
}
