import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { StatusCodes } from 'http-status-codes'
import AddMotoToUserUseCase from '~/application/interfaces/uses-cases/user/add-moto-to-user'
import DeleteMotoToUserUseCase from '~/application/interfaces/uses-cases/user/delete-moto-to-user'
import GetAllUsersUseCase from '~/application/interfaces/uses-cases/user/get-all-users'
import GetUserEventsUseCase from '~/application/interfaces/uses-cases/user/get-event-of-user'
import GetUserByIdUseCase from '~/application/interfaces/uses-cases/user/get-user-by-id'
import UpdateUserUseCase from '~/application/interfaces/uses-cases/user/update-user'
import { DeleteUserById } from '~/application/use-cases/user/delete-user-by-id'
import { Groups } from '~/domain/base/groups'
import { UserUpdateDto } from '~/domain/dtos/user-dto'
import Event from '~/domain/entities/event'
import Moto from '~/domain/entities/moto'
import User from '~/domain/entities/user'
import { Scopes } from '~/domain/enums/scope-enum'
import { Jwt } from '~/domain/interfaces/jwt'
import { ResponseStructureArray, ResponseStructureSingle } from '~/domain/types/response-structure'
import { authMiddleware } from '~/presentation/middlewares/auth.middleware'
import { transform } from '~/presentation/middlewares/response-wrapper.middleware'
import { validateBody } from '../middlewares/validate-body.middleware'
export default function UsersRouter(
  getAllUsersUseCase: GetAllUsersUseCase,
  getUserEvents: GetUserEventsUseCase,
  addMotoToUserUseCase: AddMotoToUserUseCase,
  deleteMotoToUserUseCase: DeleteMotoToUserUseCase,
  updateUserUseCase: UpdateUserUseCase,
  getUserByIdUseCase: GetUserByIdUseCase,
  deleteUserByIdUseCase: DeleteUserById,
  jwtService: Jwt<any>
) {
  const router = express.Router()
  const getUsersMiddleware = authMiddleware(jwtService, [Scopes.CanGetUsers])
  const getUsersEventsMiddleware = authMiddleware(jwtService, [Scopes.CanGetEvents])
  const getUsersMotosMiddleware = authMiddleware(jwtService, [Scopes.CanGetMotos])
  const updateUserMiddleware = authMiddleware(jwtService, [Scopes.CanUpdateUsers], true)
  const deleteUsersMiddleware = authMiddleware(jwtService, [Scopes.CanDeleteUsers], true)
  router.get('/', getUsersMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await getAllUsersUseCase.execute()
      const transformedUsers = transform(User, users, [Groups.READ]) as ResponseStructureArray<User>

      return res.status(StatusCodes.OK).json(transformedUsers)
    } catch (error) {
      next(error)
    }
  })

  router.post(
    '/:userId/motos/:motoId',
    updateUserMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      const { userId, motoId } = req.params
      try {
        await addMotoToUserUseCase.execute(userId, motoId)

        return res.json({ message: `La moto ${motoId} a bien été ajouté à ${userId}` })
      } catch (error) {
        next(error)
      }
    }
  )
  router.delete(
    '/:userId/motos/:motoId',
    updateUserMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      const { userId, motoId } = req.params
      try {
        await deleteMotoToUserUseCase.execute(userId, motoId)

        return res.json({ message: `La moto ${motoId} a bien été supprimé à ${userId}` })
      } catch (error) {
        next(error)
      }
    }
  )
  router.get('/:userId/motos', getUsersMotosMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params
    try {
      const user = await getUserByIdUseCase.execute(userId)
      const transformedMotos = transform(Moto, user?.motos, [Groups.READ]) as ResponseStructureArray<Moto>

      return res.json(transformedMotos)
    } catch (error) {
      next(error)
    }
  })

  router.get('/:userId/events/', getUsersEventsMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params
    try {
      const events = await getUserEvents.execute(userId)
      const transformedEvents = transform(Event, events, [Groups.READ]) as ResponseStructureArray<Event>
      return res.status(StatusCodes.OK).json(transformedEvents)
    } catch (error) {
      next(error)
    }
  })

  router.patch(
    '/:id',
    validateBody(User, [Groups.UPDATE]),
    updateUserMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id
      try {
        await updateUserUseCase.execute(id, req.body as UserUpdateDto)
        const updatedUser = await getUserByIdUseCase.execute(id)
        const transformedUser = transform(User, updatedUser, [Groups.READ]) as ResponseStructureSingle<User>
        res.statusCode = StatusCodes.OK
        res.json(transformedUser)
      } catch (err) {
        next(err)
      }
    }
  )
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
