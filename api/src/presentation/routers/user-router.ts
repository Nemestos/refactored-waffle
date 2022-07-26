import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { StatusCodes } from 'http-status-codes'
import GetAllUsersUseCase from '~/application/interfaces/uses-cases/user/get-all-users'
import GetUserByIdUseCase from '~/application/interfaces/uses-cases/user/get-user-by-id'
import { Groups } from '~/domain/base/groups'
import User from '~/domain/entities/user'
import Moto from '~/domain/entities/moto'
import { Scopes } from '~/domain/enums/scope-enum'
import { Jwt } from '~/domain/interfaces/jwt'
import { ResponseStructureArray } from '~/domain/types/response-structure'
import { authMiddleware } from '~/presentation/middlewares/auth.middleware'
import { transform } from '~/presentation/middlewares/response-wrapper.middleware'
export default function UsersRouter(
  getAllUsersUseCase: GetAllUsersUseCase,
  getUserByIdUserCase: GetUserByIdUseCase,
  jwtService: Jwt<any>
) {
  const router = express.Router()
  const basicJwtMiddleware = authMiddleware(jwtService, [Scopes.CanGetUsers])
  router.get('/', basicJwtMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await getAllUsersUseCase.execute()
      const transformedUsers = transform(User, users, [Groups.READ]) as ResponseStructureArray<User>
      transformedUsers.data.forEach((user) => {
        const transformedMoto = transform(Moto, user.motos, [Groups.READ]) as ResponseStructureArray<Moto>
        user.motos = transformedMoto.data
      })
      return res.status(StatusCodes.OK).json(transformedUsers)
    } catch (error) {
      next(error)
    }
  })

  router.get('/:id', basicJwtMiddleware, async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id
    try {
      const user = await getUserByIdUserCase.execute(id)
      return res.status(StatusCodes.OK).json(transform(User, user, [Groups.READ]))
    } catch (error) {
      next(error)
    }
  })

  return router
}
