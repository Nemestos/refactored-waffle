import express, { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import GetAllUsersUseCase, { GetAllUsersErrors } from '~/application/interfaces/uses-cases/user/get-all-users'
export default function UsersRouter(getAllUsersUseCase: GetAllUsersUseCase) {
  const router = express.Router()
  router.get('/', async (req: Request, res: Response) => {
    try {
      const users = await getAllUsersUseCase.execute()
      res.send(users)
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: GetAllUsersErrors.INTERNAL_SERVER_ERROR })
    }
  })

  return router
}
