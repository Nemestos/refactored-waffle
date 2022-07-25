import { UserSigninDto } from '~/domain/dtos/user-dto'

export default interface SigninUseCase {
  execute(use: UserSigninDto): Promise<string>
}
