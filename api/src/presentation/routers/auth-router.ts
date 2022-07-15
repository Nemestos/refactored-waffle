import express, { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import User from '~/domain/entities/user'
import SignupUseCase from '~/domain/interfaces/use-cases/auth/signup'
import { GetAllUsersErrors } from '~/domain/interfaces/use-cases/user/get-all-users'

export default function AuthRouter(signupUseCase: SignupUseCase) {
  const router = express.Router()
  router.post('/signup', async (req: Request, res: Response) => {
    try {
      await signupUseCase.execute(req.body as User)
      res.statusCode = StatusCodes.CREATED
      res.json({ message: "L'utilisateur a bien été crée" })
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: GetAllUsersErrors.INTERNAL_SERVER_ERROR })
    }
  })
}
