import UserDto from '~/domain/dtos/user-dto'
import User from '~/domain/entities/user'

export default interface GetAllUsersUseCase {
  execute(): Promise<User[]>
}
export enum GetAllUsersErrors {
  INTERNAL_SERVER_ERROR = 'Erreur lors de la récuperation des utilisateurs'
}
