import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { StatusCodes } from 'http-status-codes'
import GetAllUsersUseCase from '~/application/interfaces/uses-cases/user/get-all-users'
import GetUserByIdUseCase from '~/application/interfaces/uses-cases/user/get-user-by-id'
import { Groups } from '~/domain/base/groups'
import User from '~/domain/entities/user'
import { Scopes } from '~/domain/enums/scope-enum'
import { Jwt } from '~/domain/interfaces/jwt'
import { ResponseStructureArray, ResponseStructureSingle } from '~/domain/types/response-structure'
import { authMiddleware } from '~/presentation/middlewares/auth.middleware'
import { transform } from '~/presentation/middlewares/response-wrapper.middleware'
import { DeleteUserById } from '~/application/use-cases/user/delete-user-by-id'
export default function UsersRouter(
  getAllUsersUseCase: GetAllUsersUseCase,
  getUserByIdUseCase: GetUserByIdUseCase,
  deleteUserByIdUseCase: DeleteUserById,
  jwtService: Jwt<any>
) {
  const router = express.Router()
  const getUsersMiddleware = authMiddleware(jwtService, [Scopes.CanGetUsers])
  const deleteUsersMiddleware = authMiddleware(jwtService, [Scopes.CanDeleteUsers])
  router.get('/', getUsersMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await getAllUsersUseCase.execute()
      const transformedUsers = transform(User, users, [Groups.READ]) as ResponseStructureArray<User>

      return res.status(StatusCodes.OK).json(transformedUsers)
    } catch (error) {
      next(error)
    }
  })
  router.get('/:id', getUsersMiddleware, async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id
    try {
      const user = await getUserByIdUseCase.execute(id)
      const transformedUser = transform(User, user, [Groups.READ]) as ResponseStructureSingle<User>
      return res.status(StatusCodes.OK).json(transformedUser)
    } catch (error) {
      next(error)
    }
  })
  router.delete(
    '/:id',
    deleteUsersMiddleware,
    async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
      const id = req.params.id
      try {
        await deleteUserByIdUseCase.execute(id)
        return res.status(StatusCodes.OK).json({ message: "L'utilisateur à bien supprimé " })
      } catch (error) {
        next(error)
      }
    }
  )

  return router
}
