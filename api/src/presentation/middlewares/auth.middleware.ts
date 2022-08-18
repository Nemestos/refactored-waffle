import { NextFunction, Request, Response } from 'express'
import { JsonWebTokenError } from 'jsonwebtoken'
import { UserJwtPayloadDto } from '~/domain/dtos/user-dto'
import { Scopes } from '~/domain/enums/scope-enum'
import { ErrorCode } from '~/domain/errors/error-code'
import { ErrorException } from '~/domain/errors/error-exception'
import { Jwt } from '~/domain/interfaces/jwt'

const handleAuthorizationId = (resourceId: string, userId: string) => {
  return resourceId === userId
}
const handleAuthorizationScopes = (requiredScopes: Scopes[] = [], userScopes: Scopes[] = []) => {
  return requiredScopes.every((scope) => userScopes.includes(scope))
}

export const authMiddleware = (
  jwtService: Jwt<UserJwtPayloadDto>,
  scopes: Scopes[] = [],
  withAuthorizationId = false
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization || req.cookies.access_token
    if (!auth && !auth?.startsWith('Bearer')) {
      throw new ErrorException(ErrorCode.MissingTokenError)
    }

    const token = auth.replace('Bearer ', '')
    try {
      const tokenData = jwtService.verifyToken(token)

      const canAccessWithId = !withAuthorizationId || handleAuthorizationId(req.params.id, tokenData?._id || '')
      const canAccessWithScopes = handleAuthorizationScopes(scopes, tokenData?.scopes)
      if (!canAccessWithScopes && !canAccessWithId) {
        throw new ErrorException(ErrorCode.UnauthorizeError)
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
