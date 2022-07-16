import User from '~/domain/entities/user'

export default interface SignupUseCase {
  execute(use: User): Promise<boolean>
}
