import RefreshUseCase from '~/application/interfaces/uses-cases/auth/refresh'
import { UserJwtPayloadDto } from '~/domain/dtos/user-dto'
import { ErrorCode } from '~/domain/errors/error-code'
import { ErrorException } from '~/domain/errors/error-exception'
import { Jwt } from '~/domain/interfaces/jwt'
import UserRepository from '~/infrastructure/interfaces/repositories/user-repository'

export class Refresh implements RefreshUseCase {
  constructor(private readonly userRepository: UserRepository, private readonly jwtService: Jwt<UserJwtPayloadDto>) {}

  async execute(refresh: string): Promise<[string, string]> {
    const userPayload = this.jwtService.verifyToken(refresh)
    if (!this.jwtService.isRefreshExist(refresh) || !userPayload) {
      throw new ErrorException(ErrorCode.UnauthenticatedError)
    }
    const existingUser = await this.userRepository.findUserByEmail(userPayload?.email)
    if (!existingUser) {
      throw new ErrorException(ErrorCode.UnauthenticatedError)
    }

    const accessToken = this.jwtService.generateAccessToken(existingUser)
    const refreshToken = this.jwtService.generateRefreshToken(existingUser)
    await this.jwtService.addToRefreshList(refreshToken, accessToken)
    return [accessToken, refreshToken]
  }
}
