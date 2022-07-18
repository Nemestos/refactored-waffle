import express, { Request, Response } from 'express'
import 'express-async-errors'
import { StatusCodes } from 'http-status-codes'
import GetAllUsersUseCase, { GetAllUsersErrors } from '~/application/interfaces/uses-cases/user/get-all-users'
import { UserApiDto } from '~/domain/dtos/user-dto'
export default function UsersRouter(getAllUsersUseCase: GetAllUsersUseCase) {
  const router = express.Router()
  router.get('/', async (req: Request, res: Response) => {
    try {
      const users = await getAllUsersUseCase.execute()
      res.send(users.map((user) => user as UserApiDto))
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: GetAllUsersErrors.INTERNAL_SERVER_ERROR })
    }
  })

  return router
}
