import User from '~/domain/entities/user'

export default interface CreateUserUseCase {
  execute(user: User): Promise<boolean>
}
