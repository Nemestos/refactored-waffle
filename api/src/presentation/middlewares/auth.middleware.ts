import { NextFunction, Request, Response } from 'express'
import { ErrorCode } from '~/domain/errors/error-code'
import { ErrorException } from '~/domain/errors/error-exception'
import { Jwt } from '~/domain/interfaces/jwt'

export const authMiddleware = (jwtService: Jwt<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization
    if (auth && auth.startsWith('Bearer')) {
      const token = auth.replace('Bearer ', '')
      try {
        const tokenData = jwtService.verifyToken(token)
        req.body.tokenData = tokenData
        next()
      } catch (err) {
        throw new ErrorException(ErrorCode.Unauthenticated)
      }
    } else {
      throw new ErrorException(ErrorCode.Unauthenticated)
    }
  }
}
