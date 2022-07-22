import { Jwt } from '~/domain/interfaces/jwt'
import jwt from 'jsonwebtoken'
import { config } from '~/config'

import { UserJwtPayloadDto } from '~/domain/dtos/user-dto'

export class UserJwt implements Jwt<UserJwtPayloadDto> {
  generateToken(payload: UserJwtPayloadDto): string {
    return jwt.sign({ _id: payload._id, email: payload.email, scopes: payload.scopes }, config.JWT_KEY, {
      expiresIn: '1d'
    })
  }

  verifyToken(token: string): UserJwtPayloadDto {
    const tokenData = jwt.verify(token, config.JWT_KEY)
    return tokenData as UserJwtPayloadDto
  }
}
