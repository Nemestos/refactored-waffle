import SigninUseCase from '~/application/interfaces/uses-cases/auth/signin'
import { UserSigninDto } from '~/domain/dtos/user-dto'
import User from '~/domain/entities/user'
import { ErrorCode } from '~/domain/errors/error-code'
import { ErrorException } from '~/domain/errors/error-exception'
import { PasswordHasher } from '~/domain/interfaces/hasher'
import { Jwt } from '~/domain/interfaces/jwt'
import UserRepository from '~/infrastructure/interfaces/repositories/user-repository'

export class Signin implements SigninUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly jwtService: Jwt<any>
  ) {}

  async execute(user: UserSigninDto): Promise<[string, string, User]> {
    const existingUser = await this.userRepository.findUserByEmail(user.email)
    if (!existingUser) {
      throw new ErrorException(ErrorCode.UnauthenticatedError)
    }
    const validPassword = await this.passwordHasher.comparePasswords(user.password, existingUser.password)
    if (!validPassword) {
      throw new ErrorException(ErrorCode.UnauthenticatedError)
    }
    const accessToken = this.jwtService.generateAccessToken(existingUser)
    const refreshToken = this.jwtService.generateRefreshToken(existingUser)
    await this.jwtService.addToRefreshList(refreshToken, accessToken)
    return [accessToken, refreshToken, existingUser]
  }
}
