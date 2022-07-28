import CreateEventUseCase from '~/application/interfaces/uses-cases/event/create-event'
import Event from '~/domain/entities/event'
import { ErrorCode } from '~/domain/errors/error-code'
import { ErrorException } from '~/domain/errors/error-exception'
import EventRepository from '~/infrastructure/interfaces/repositories/event-repository'
import UserRepository from '~/infrastructure/interfaces/repositories/user-repository'

export class CreateEvent implements CreateEventUseCase {
  constructor(private readonly eventRepository: EventRepository, private readonly userRepository: UserRepository) {}

  async execute(event: Event): Promise<boolean> {
    const ownerExist = await this.userRepository.userExist(event.owner!.toString())
    if (!ownerExist) {
      throw new ErrorException(ErrorCode.NotFoundId, { resource: 'event/owner' })
    }
    const newEvent = { ...event } as Event
    return await this.eventRepository.createEvent(newEvent)
  }
}
