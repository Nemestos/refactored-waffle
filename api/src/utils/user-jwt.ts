import { Jwt } from '~/domain/interfaces/jwt'
import User from '~/domain/entities/user'
import jwt from 'jsonwebtoken'
import { config } from '~/config'
import { ErrorException } from '~/domain/errors/error-exception'
import { ErrorCode } from '~/domain/errors/error-code'
import { UserJwtPayloadDto } from '~/domain/dtos/user-dto'

export class UserJwt implements Jwt<UserJwtPayloadDto> {
  generateToken(payload: UserJwtPayloadDto): string | Promise<string> {
    return jwt.sign({ _id: payload._id, email: payload.email }, config.JWT_KEY, { expiresIn: '2h' })
  }

  verifyToken(token: string): UserJwtPayloadDto | Promise<UserJwtPayloadDto> {
    try {
      const tokenData = jwt.verify(token, config.JWT_KEY)
      return tokenData as UserJwtPayloadDto
    } catch (err) {
      throw new ErrorException(ErrorCode.Unauthenticated)
    }
  }
}
