import GetAllEventUseCase from '~/application/interfaces/uses-cases/event/get-all-event'
import Event from '~/domain/entities/event'
import EventRepository from '~/infrastructure/interfaces/repositories/event-repository'

export class GetAllEvents implements GetAllEventUseCase {
  constructor(private readonly eventRepository: EventRepository) {}
  async execute(): Promise<Event[]> {
    return await this.eventRepository.getEvents()
  }
}
