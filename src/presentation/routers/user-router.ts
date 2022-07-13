import express, { Request, Response } from 'express'
import User from '~/domain/entities/user'
import CreateUserUseCase from '~/domain/interfaces/use-cases/user/create-user'
import GetAllUsersUseCase, { GetAllUsersErrors } from '~/domain/interfaces/use-cases/user/get-all-user'
import { StatusCodes } from 'http-status-codes'
export default function UsersRouter(getAllUsersUseCase: GetAllUsersUseCase, createUserUseCase: CreateUserUseCase) {
  const router = express.Router()
  router.get('/', async (req: Request, res: Response) => {
    try {
      const users = await getAllUsersUseCase.execute()
      res.send(users)
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: GetAllUsersErrors.INTERNAL_SERVER_ERROR })
    }
  })

  router.post('/', async (req: Request, res: Response) => {
    try {
      await createUserUseCase.execute(req.body as User)
      res.statusCode = StatusCodes.CREATED
      res.json({ message: "L'utilisateur a bien été crée" })
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: GetAllUsersErrors.INTERNAL_SERVER_ERROR })
    }
  })
  return router
}
