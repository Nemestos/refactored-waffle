import express, { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import SignupUseCase from '~/application/interfaces/uses-cases/auth/signup'
import User from '~/domain/entities/user'
import 'express-async-errors'
import { UserCreateValidator } from '~/domain/validators/user-validator'
import { validate } from 'class-validator'
import { ErrorException } from '~/domain/errors/error-exception'
import { ErrorCode } from '~/domain/errors/error-code'

export default function AuthRouter(signupUseCase: SignupUseCase) {
  const router = express.Router()
  router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    const userValidation = new UserCreateValidator()
    userValidation.email = req.body.email
    userValidation.firstname = req.body.firstname
    userValidation.surname = req.body.surname
    userValidation.password = req.body.password
    const errors = await validate(userValidation)
    if (errors.length) {
      throw new ErrorException(ErrorCode.ValidationError, errors)
    }
    try {
      await signupUseCase.execute(req.body as User)
      res.statusCode = StatusCodes.CREATED
      res.json({ message: "L'utilisateur a bien été crée" })
    } catch (err) {
      next(err)
    }
  })
  return router
}
