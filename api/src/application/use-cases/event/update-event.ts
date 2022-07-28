import UpdateEventUseCase from '~/application/interfaces/uses-cases/event/update-event'
import { EventUpdateDto } from '~/domain/dtos/event-dto'
import { ErrorCode } from '~/domain/errors/error-code'
import { ErrorException } from '~/domain/errors/error-exception'
import EventRepository from '~/infrastructure/interfaces/repositories/event-repository'
import UserRepository from '~/infrastructure/interfaces/repositories/user-repository'
import { logger } from '~/utils/logger'

export class UpdateEvent implements UpdateEventUseCase {
  constructor(private readonly eventRepository: EventRepository, private readonly userRepository: UserRepository) {}

  async execute(id: string, event: EventUpdateDto): Promise<boolean> {
    for (const participant of event.participants || []) {
      const userExist = await this.userRepository.userExist(participant.user as string)
      if (!userExist) {
        throw new ErrorException(ErrorCode.NotFoundId, { id: participant.user, resource: 'event/participants' })
      }
    }

    const updatedEvent = { ...event } as EventUpdateDto
    logger.info(updatedEvent)
    return await this.eventRepository.updateEvent(id, updatedEvent)
  }
}
