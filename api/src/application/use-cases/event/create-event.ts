import CreateEventUseCase from '~/application/interfaces/uses-cases/event/create-event'
import Event from '~/domain/entities/event'
import EventRepository from '~/infrastructure/interfaces/repositories/event-repository'

export class CreateEvent implements CreateEventUseCase {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute(event: Event): Promise<boolean> {
    const newEvent = { ...event } as Event
    return await this.eventRepository.createEvent(newEvent)
  }
}
