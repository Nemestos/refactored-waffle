import express, { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import SignupUseCase from '~/application/interfaces/uses-cases/auth/signup'
import User from '~/domain/entities/user'
import 'express-async-errors'
import SigninUseCase from '~/application/interfaces/uses-cases/auth/signin'
import { UserSigninDto } from '~/domain/dtos/user-dto'
import { validateBody } from '~/presentation/middlewares/validate-body.middleware'
import { Groups } from '~/domain/base/groups'

/**
 *
 * @param signupUseCase the signup use case dependency for handle user signup with exception throw
 * @param signinUseCase  the signin use case dependency for handle user signin and token generation with exception throw
 * @returns the router with all routes
 */
export default function AuthRouter(signupUseCase: SignupUseCase, signinUseCase: SigninUseCase) {
  const router = express.Router()
  router.post(
    '/signup',
    validateBody(User, [Groups.CREATE]),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await signupUseCase.execute(req.body as User)
        res.statusCode = StatusCodes.CREATED
        res.json({ message: "L'utilisateur a bien été crée" })
      } catch (err) {
        next(err)
      }
    }
  )

  router.post('/signin', validateBody(User, [Groups.AUTH]), async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await signinUseCase.execute(req.body as UserSigninDto)
      res.statusCode = StatusCodes.OK
      res.json({ token })
    } catch (err) {
      next(err)
    }
  })
  return router
}
