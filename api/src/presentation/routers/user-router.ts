import { plainToInstance } from 'class-transformer'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { StatusCodes } from 'http-status-codes'
import GetAllUsersUseCase from '~/application/interfaces/uses-cases/user/get-all-users'
import { Groups } from '~/domain/base/groups'
import User from '~/domain/entities/user'
import { transform } from '~/presentation/middlewares/response-wrapper.middleware'
export default function UsersRouter(getAllUsersUseCase: GetAllUsersUseCase) {
  const router = express.Router()
  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await getAllUsersUseCase.execute()
      return res.status(StatusCodes.OK).json(transform(User, users, [Groups.READ]))
    } catch (error) {
      next(error)
    }
  })

  return router
}
