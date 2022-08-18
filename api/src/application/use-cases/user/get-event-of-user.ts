import GetUserEventsUseCase from '~/application/interfaces/uses-cases/user/get-event-of-user'
import Event from '~/domain/entities/event'
import { ErrorCode } from '~/domain/errors/error-code'
import { ErrorException } from '~/domain/errors/error-exception'
import EventRepository from '~/infrastructure/interfaces/repositories/event-repository'
import UserRepository from '~/infrastructure/interfaces/repositories/user-repository'

export default class GetUserEvents implements GetUserEventsUseCase {
  constructor(private readonly userRepository: UserRepository, private readonly eventRepository: EventRepository) {}

  async execute(userId: string): Promise<Event[]> {
    try {
      const isUserExist = await this.userRepository.userExist(userId)
      if (!isUserExist) {
        throw new ErrorException(ErrorCode.NotFoundId, { userId, resourceName: 'user' })
      }
    } catch (err) {
      throw new ErrorException(ErrorCode.InvalidId, { userId, resourceName: 'user' })
    }
    const allEvents = await this.eventRepository.getEvents()
    const userEvents = allEvents.filter((event) => event.participants.some((participant) => participant._id === userId))

    return userEvents
  }
}
