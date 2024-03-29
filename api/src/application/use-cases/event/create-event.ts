import { logger } from '@typegoose/typegoose/lib/logSettings'
import CreateEventUseCase from '~/application/interfaces/uses-cases/event/create-event'
import { EventCreationDto } from '~/domain/dtos/event-dto'
import { ErrorCode } from '~/domain/errors/error-code'
import { ErrorException } from '~/domain/errors/error-exception'
import EventRepository from '~/infrastructure/interfaces/repositories/event-repository'
import UserRepository from '~/infrastructure/interfaces/repositories/user-repository'

export class CreateEvent implements CreateEventUseCase {
  constructor(private readonly eventRepository: EventRepository, private readonly userRepository: UserRepository) {}

  async execute(event: EventCreationDto): Promise<boolean> {
    const ownerExist = await this.userRepository.userExist(event.owner as string)
    if (!ownerExist) {
      throw new ErrorException(ErrorCode.NotFoundId, { id: event.owner, resource: 'event/owner' })
    }
    for (const participant of event.participants || []) {
      const userExist = await this.userRepository.userExist(participant.user as string)
      logger.error(userExist)
      if (!userExist) {
        throw new ErrorException(ErrorCode.NotFoundId, { id: participant.user, resource: 'event/participants' })
      }
    }

    const newEvent = { ...event } as EventCreationDto
    return await this.eventRepository.createEvent(newEvent)
  }
}
