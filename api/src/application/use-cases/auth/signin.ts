import User from '~/domain/entities/user'
import { ErrorCode } from '~/domain/errors/error-code'
import { ErrorException } from '~/domain/errors/error-exception'
import { PasswordHasher } from '~/domain/interfaces/hasher'
import UserRepository from '~/infrastructure/interfaces/repositories/user-repository'
import SigninUseCase from '~/application/interfaces/uses-cases/auth/signin'
import { UserSigninDto } from '~/domain/dtos/user-dto'
import { Jwt } from '~/domain/interfaces/jwt'

export class Signin implements SigninUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly jwtService: Jwt<any>
  ) {}

  async execute(user: UserSigninDto): Promise<string> {
    const existingUser = await this.userRepository.findUserByEmail(user.email)
    if (!existingUser) {
      throw new ErrorException(ErrorCode.Unauthenticated)
    }
    const validPassword = await this.passwordHasher.comparePasswords(user.password, existingUser.password)
    if (!validPassword) {
      throw new ErrorException(ErrorCode.Unauthenticated)
    }
    return this.jwtService.generateToken(existingUser)
  }
}
