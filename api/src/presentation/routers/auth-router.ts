import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { StatusCodes } from 'http-status-codes'
import RefreshUseCase from '~/application/interfaces/uses-cases/auth/refresh'
import SigninUseCase from '~/application/interfaces/uses-cases/auth/signin'
import SignupUseCase from '~/application/interfaces/uses-cases/auth/signup'
import { Groups } from '~/domain/base/groups'
import { UserCreationDto, UserSigninDto } from '~/domain/dtos/user-dto'
import User from '~/domain/entities/user'
import { ErrorCode } from '~/domain/errors/error-code'
import { ErrorException } from '~/domain/errors/error-exception'
import { validateBody } from '~/presentation/middlewares/validate-body.middleware'

/**
 *
 * @param signupUseCase the signup use case dependency for handle user signup with exception throw
 * @param signinUseCase  the signin use case dependency for handle user signin and token generation with exception throw
 * @returns the router with all routes
 */
export default function AuthRouter(
  signupUseCase: SignupUseCase,
  signinUseCase: SigninUseCase,
  refreshUseCase: RefreshUseCase
) {
  const router = express.Router()

  router.post('/refresh', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh = req.body.refresh
      if (!refresh) {
        throw new ErrorException(ErrorCode.ValidationError, { refresh: 'no refresh token found' })
      }
      const [accessToken, refreshToken] = await refreshUseCase.execute(refresh)
      res.statusCode = StatusCodes.OK
      res.json({ accessToken, refreshToken })
    } catch (err) {
      next(err)
    }
  })
  router.post(
    '/signup',
    validateBody(User, [Groups.CREATE]),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await signupUseCase.execute(req.body as UserCreationDto)
        res.statusCode = StatusCodes.CREATED
        res.json({ message: "L'utilisateur a bien été crée" })
      } catch (err) {
        next(err)
      }
    }
  )

  router.post('/signin', validateBody(User, [Groups.AUTH]), async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [accessToken, refreshToken] = await signinUseCase.execute(req.body as UserSigninDto)
      res.statusCode = StatusCodes.OK
      res.json({ accessToken, refreshToken })
    } catch (err) {
      next(err)
    }
  })
  return router
}
