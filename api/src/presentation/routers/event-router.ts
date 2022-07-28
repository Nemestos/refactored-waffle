import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { StatusCodes } from 'http-status-codes'
import CreateEventUseCase from '~/application/interfaces/uses-cases/event/create-event'
import DeleteEventByIdUseCase from '~/application/interfaces/uses-cases/event/delete-event-by-id'
import GetAllEventUseCase from '~/application/interfaces/uses-cases/event/get-all-event'
import GetEventByIdUseCase from '~/application/interfaces/uses-cases/event/get-event-by-id'
import { Groups } from '~/domain/base/groups'
import Event from '~/domain/entities/event'
import { Scopes } from '~/domain/enums/scope-enum'
import { Jwt } from '~/domain/interfaces/jwt'
import { ResponseStructureArray, ResponseStructureSingle } from '~/domain/types/response-structure'
import { authMiddleware } from '~/presentation/middlewares/auth.middleware'
import { transform } from '~/presentation/middlewares/response-wrapper.middleware'
import { validateBody } from '../middlewares/validate-body.middleware'
export default function EventsRouter(
  createEventUseCase: CreateEventUseCase,
  getAllEventsUseCase: GetAllEventUseCase,
  getEventById: GetEventByIdUseCase,
  deleteEventByIdUseCase: DeleteEventByIdUseCase,
  jwtService: Jwt<any>
) {
  const router = express.Router()
  const getEventsMiddleware = authMiddleware(jwtService, [Scopes.CanGetEvents])
  const deleteEventsMiddleware = authMiddleware(jwtService, [Scopes.CanDeleteEvents])

  router.post('/', validateBody(Event, [Groups.CREATE]), async (req: Request, res: Response, next: NextFunction) => {
    try {
      await createEventUseCase.execute(req.body as Event)
      res.statusCode = StatusCodes.CREATED
      res.json({ message: "L'event a bien été crée" })
    } catch (err) {
      next(err)
    }
  })
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
