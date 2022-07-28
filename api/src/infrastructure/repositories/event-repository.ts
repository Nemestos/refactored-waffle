import { EventCreationDto, EventUpdateDto } from '~/domain/dtos/event-dto'
import Event from '~/domain/entities/event'
import { EventDataSource } from '../interfaces/data-sources/event-ds'
import EventRepository from '../interfaces/repositories/event-repository'
export class EventRepositoryImpl implements EventRepository {
  eventDataSource: EventDataSource

  constructor(eventDataSource: EventDataSource) {
    this.eventDataSource = eventDataSource
  }

  async eventExist(id: string): Promise<boolean> {
    return await this.eventDataSource.eventExist(id)
  }

  async createEvent(event: EventCreationDto): Promise<boolean> {
    return await this.eventDataSource.create(event)
  }

  async updateEvent(id: string, event: EventUpdateDto): Promise<boolean> {
    return await this.eventDataSource.update(id, event)
  }

  async getEvents(): Promise<Event[]> {
    const res = await this.eventDataSource.getAll()
    return res
  }

  async findEventById(id: string): Promise<Event | null> {
    const res = await this.eventDataSource.getById(id)
    return res
  }

  async deleteEventById(id: string): Promise<void> {
    await this.eventDataSource.deleteById(id)
  }
}
