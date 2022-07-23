import User from '~/domain/entities/user'

export default interface GetAllUsersUseCase {
  execute(): Promise<User[]>
}
