import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { StatusCodes } from 'http-status-codes'
import CreateEventUseCase from '~/application/interfaces/uses-cases/event/create-event'
import DeleteEventByIdUseCase from '~/application/interfaces/uses-cases/event/delete-event-by-id'
import GetAllEventUseCase from '~/application/interfaces/uses-cases/event/get-all-event'
import GetEventByIdUseCase from '~/application/interfaces/uses-cases/event/get-event-by-id'
import UpdateEventUseCase from '~/application/interfaces/uses-cases/event/update-event'
import { Groups } from '~/domain/base/groups'
import { EventCreationDto, EventUpdateDto } from '~/domain/dtos/event-dto'
import { UserJwtPayloadDto } from '~/domain/dtos/user-dto'
import Event from '~/domain/entities/event'
import { Scopes } from '~/domain/enums/scope-enum'
import { Jwt } from '~/domain/interfaces/jwt'
import { ResponseStructureArray, ResponseStructureSingle } from '~/domain/types/response-structure'
import { authMiddleware } from '~/presentation/middlewares/auth.middleware'
import { transform } from '~/presentation/middlewares/response-wrapper.middleware'
import { validateBody } from '../middlewares/validate-body.middleware'

export default function EventsRouter(
  createEventUseCase: CreateEventUseCase,
  updateEventsUseCase: UpdateEventUseCase,
  getAllEventsUseCase: GetAllEventUseCase,
  getEventById: GetEventByIdUseCase,
  deleteEventByIdUseCase: DeleteEventByIdUseCase,
  jwtService: Jwt<any>
) {
  const router = express.Router()
  const createEventMiddleware = authMiddleware(jwtService, [Scopes.CanCreateEvents])
  const updateEventsMiddleware = authMiddleware(jwtService, [Scopes.CanUpdateEvents])
  const getEventsMiddleware = authMiddleware(jwtService, [Scopes.CanGetEvents])
  const deleteEventsMiddleware = authMiddleware(jwtService, [Scopes.CanDeleteEvents])

  router.post(
    '/',
    validateBody(Event, [Groups.CREATE]),
    createEventMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      const tokenData = req.body.tokenData as UserJwtPayloadDto
      try {
        await createEventUseCase.execute({
          owner: tokenData._id,
          name: req.body.name,
          category: req.body.category,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          participants: req.body.participants
        } as EventCreationDto)
        res.statusCode = StatusCodes.CREATED
        res.json({ message: "L'event a bien été crée" })
      } catch (err) {
        next(err)
      }
    }
  )

  router.patch(
    '/:id',
    validateBody(Event, [Groups.UPDATE]),
    updateEventsMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id
      try {
        await updateEventsUseCase.execute(id, {
          ...req.body
        } as EventUpdateDto)
        res.statusCode = StatusCodes.OK
        res.json({ message: "L'event a bien été mis à jour" })
      } catch (err) {
        next(err)
      }
    }
  )
  router.get('/', getEventsMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const events = await getAllEventsUseCase.execute()
      const transformedEvents = transform(Event, events, [Groups.READ]) as ResponseStructureArray<Event>

      return res.status(StatusCodes.OK).json(transformedEvents)
    } catch (error) {
      next(error)
    }
  })
  router.get('/:id', getEventsMiddleware, async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id
    try {
      const event = await getEventById.execute(id)
      const transformedUser = transform(Event, event, [Groups.READ]) as ResponseStructureSingle<Event>
      return res.status(StatusCodes.OK).json(transformedUser)
    } catch (error) {
      next(error)
    }
  })
  router.delete(
    '/:id',
    deleteEventsMiddleware,
    async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
      const id = req.params.id
      try {
        await deleteEventByIdUseCase.execute(id)
        return res.status(StatusCodes.OK).json({ message: "L'event à bien supprimé " })
      } catch (error) {
        next(error)
      }
    }
  )

  return router
}
