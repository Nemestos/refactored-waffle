import { NextFunction, Request, Response } from 'express'
import { JsonWebTokenError } from 'jsonwebtoken'
import { UserJwtPayloadDto } from '~/domain/dtos/user-dto'
import { Scopes } from '~/domain/enums/scope-enum'
import { ErrorCode } from '~/domain/errors/error-code'
import { ErrorException } from '~/domain/errors/error-exception'
import { Jwt } from '~/domain/interfaces/jwt'
import { logger } from '~/utils/logger'

export const authMiddleware = (jwtService: Jwt<UserJwtPayloadDto>, scopes: Scopes[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization
    if (!auth && !auth?.startsWith('Bearer')) {
      throw new ErrorException(ErrorCode.MissingTokenError)
    }

    const token = auth.replace('Bearer ', '')
    try {
      const tokenData = jwtService.verifyToken(token)
      if (!scopes.every((scope) => tokenData.scopes.includes(scope))) {
        throw new ErrorException(ErrorCode.UnauthorizeError, { required_scopes: scopes, your_scopes: tokenData.scopes })
      }
      req.body.tokenData = tokenData
      next()
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new ErrorException(ErrorCode.ExpiredTokenError)
      }
      if (err instanceof JsonWebTokenError) {
        throw new ErrorException(ErrorCode.UnauthenticatedError)
      }
      throw err
    }
  }
}
