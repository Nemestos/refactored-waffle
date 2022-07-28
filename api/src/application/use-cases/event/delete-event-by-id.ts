import DeleteEventByIdUseCase from '~/application/interfaces/uses-cases/event/delete-event-by-id'
import { ErrorCode } from '~/domain/errors/error-code'
import { ErrorException } from '~/domain/errors/error-exception'
import EventRepository from '~/infrastructure/interfaces/repositories/event-repository'

export class DeleteEventById implements DeleteEventByIdUseCase {
  constructor(private readonly eventRepository: EventRepository) {}
  async execute(id: string): Promise<void> {
    try {
      const isExist = await this.eventRepository.eventExist(id)
      if (!isExist) {
        throw new ErrorException(ErrorCode.NotFoundId, { id, resourceName: 'event' })
      }
    } catch (err) {
      throw new ErrorException(ErrorCode.InvalidId, { id, resourceName: 'event' })
    }

    await this.eventRepository.deleteEventById(id)
  }
}
