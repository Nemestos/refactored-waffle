import { mongoose } from '@typegoose/typegoose'
import GetEventByIdUseCase from '~/application/interfaces/uses-cases/event/get-event-by-id'
import Event from '~/domain/entities/event'
import { ErrorCode } from '~/domain/errors/error-code'
import { ErrorException } from '~/domain/errors/error-exception'
import EventRepository from '~/infrastructure/interfaces/repositories/event-repository'

export class GetEventById implements GetEventByIdUseCase {
  constructor(private readonly eventRepository: EventRepository) {}
  async execute(id: string): Promise<Event | null> {
    try {
      const isExist = await this.eventRepository.eventExist(id)
      if (!isExist) {
        throw new ErrorException(ErrorCode.NotFoundId, { id, resourceName: 'event' })
      }
    } catch (err) {
      throw new ErrorException(ErrorCode.InvalidId, { id, resourceName: 'event' })
    }

    try {
      const res = await this.eventRepository.findEventById(id)

      return res
    } catch (err) {
      if (err instanceof mongoose.Error.CastError) {
        throw new ErrorException(ErrorCode.NotFoundId, { id, resourceName: 'event' })
      }
      throw err
    }
  }
}
