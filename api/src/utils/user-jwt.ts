import { Jwt } from '~/domain/interfaces/jwt'
import jwt from 'jsonwebtoken'
import { config } from '~/config'

import { UserJwtPayloadDto } from '~/domain/dtos/user-dto'

export class UserJwt implements Jwt<UserJwtPayloadDto> {
  generateToken(payload: UserJwtPayloadDto): string | Promise<string> {
    return jwt.sign({ _id: payload._id, email: payload.email }, config.JWT_KEY, { expiresIn: '1d' })
  }

  verifyToken(token: string): UserJwtPayloadDto | Promise<UserJwtPayloadDto> {
    const tokenData = jwt.verify(token, config.JWT_KEY)
    return tokenData as UserJwtPayloadDto
  }
}
