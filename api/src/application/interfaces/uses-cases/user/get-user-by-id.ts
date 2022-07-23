import User from '~/domain/entities/user'

export default interface GetUserByIdUseCase {
  execute(id: string): Promise<User | null>
}
