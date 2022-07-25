import SignupUseCase from '~/application/interfaces/uses-cases/auth/signup'
import User from '~/domain/entities/user'
import { ErrorCode } from '~/domain/errors/error-code'
import { ErrorException } from '~/domain/errors/error-exception'
import { PasswordHasher } from '~/domain/interfaces/hasher'
import UserRepository from '~/infrastructure/interfaces/repositories/user-repository'

export class Signup implements SignupUseCase {
  constructor(private readonly userRepository: UserRepository, private readonly passwordHasher: PasswordHasher) {}

  async execute(user: User): Promise<boolean> {
    const existingUser = await this.userRepository.findUserByEmail(user.email)
    const email = user.email
    if (existingUser) {
      throw new ErrorException(ErrorCode.DuplicateEntityError, { email })
    }
    const hash = await this.passwordHasher.passwordHash(user.password)
    const newUser = { ...user, password: hash } as User
    return await this.userRepository.createUser(newUser)
  }
}
