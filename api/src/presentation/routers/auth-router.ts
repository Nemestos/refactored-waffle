import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { StatusCodes } from 'http-status-codes'
import RefreshUseCase from '~/application/interfaces/uses-cases/auth/refresh'
import SigninUseCase from '~/application/interfaces/uses-cases/auth/signin'
import SignupUseCase from '~/application/interfaces/uses-cases/auth/signup'
import GetUserByIdUseCase from '~/application/interfaces/uses-cases/user/get-user-by-id'
import { Groups } from '~/domain/base/groups'
import { UserCreationDto, UserSigninDto } from '~/domain/dtos/user-dto'
import User from '~/domain/entities/user'
import { Scopes } from '~/domain/enums/scope-enum'
import { ErrorCode } from '~/domain/errors/error-code'
import { ErrorException } from '~/domain/errors/error-exception'
import { Jwt } from '~/domain/interfaces/jwt'
import { ResponseStructureSingle } from '~/domain/types/response-structure'
import { validateBody } from '~/presentation/middlewares/validate-body.middleware'
import { authMiddleware } from '../middlewares/auth.middleware'
import { transform } from '../middlewares/response-wrapper.middleware'

/**
 *
 * @param signupUseCase the signup use case dependency for handle user signup with exception throw
 * @param signinUseCase  the signin use case dependency for handle user signin and token generation with exception throw
 * @returns the router with all routes
 */
export default function AuthRouter(
  signupUseCase: SignupUseCase,
  signinUseCase: SigninUseCase,
  refreshUseCase: RefreshUseCase,
  getUserByIdUseCase: GetUserByIdUseCase,
  jwtService: Jwt<any>
) {
  const router = express.Router()
  const getUsersMiddleware = authMiddleware(jwtService, [Scopes.CanGetUsers])

  router.get('/me', getUsersMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.body.tokenData._id
      const user = await getUserByIdUseCase.execute(id)
      const transformedUser = transform(User, user, [Groups.READ]) as ResponseStructureSingle<User>
      return res.status(StatusCodes.OK).json(transformedUser)
    } catch (error) {
      next(error)
    }
  })

  router.post('/refresh', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh = req.cookies.refresh_token
      if (!refresh) {
        throw new ErrorException(ErrorCode.ValidationError, { refresh: 'no refresh token found' })
      }
      const [accessToken, refreshToken] = await refreshUseCase.execute(refresh)
      res.cookie('refresh_token', refreshToken, { maxAge: 60 * 60 * 24 * 30, httpOnly: false, secure: false })
      res.statusCode = StatusCodes.OK
      res.json({ accessToken })
    } catch (err) {
      next(err)
    }
  })

  router.delete('/logout', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh = req.cookies.refresh_token
      if (!refresh) {
        throw new ErrorException(ErrorCode.ValidationError, { refresh: 'no refresh token found' })
      }
      res.cookie('refresh_token', '', { maxAge: 60 * 60 * 24 * 30, httpOnly: false, secure: false })
      res.statusCode = StatusCodes.OK
      res.send()
    } catch (err) {
      next(err)
    }
  })
  router.post(
    '/signup',
    validateBody(User, [Groups.CREATE]),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = await signupUseCase.execute(req.body as UserCreationDto)
        const [accessToken, refreshToken] = await signinUseCase.execute({
          email: req.body.email,
          password: req.body.password
        })
        const transformedUser = transform(User, user, [Groups.READ]) as ResponseStructureSingle<User>
        res.cookie('refresh_token', refreshToken, { maxAge: 60 * 60 * 24 * 30, httpOnly: true, secure: false })

        res.statusCode = StatusCodes.CREATED
        res.json({ accessToken, me: transformedUser })
      } catch (err) {
        next(err)
      }
    }
  )

  router.post('/signin', validateBody(User, [Groups.AUTH]), async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [accessToken, refreshToken, user] = await signinUseCase.execute(req.body as UserSigninDto)
      const transformedUser = transform(User, user, [Groups.READ]) as ResponseStructureSingle<User>
      res.cookie('refresh_token', refreshToken, { maxAge: 60 * 60 * 24 * 30, httpOnly: true, secure: false })
      res.statusCode = StatusCodes.OK
      res.json({ accessToken, me: transformedUser })
    } catch (err) {
      next(err)
    }
  })
  return router
}
