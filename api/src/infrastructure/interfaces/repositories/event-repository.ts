import { EventCreationDto } from '~/domain/dtos/event-dto'
import Event from '~/domain/entities/event'

/**
 * handle the connection from data source to expose generic to use case
 */
export default interface EventRepository {
  createEvent(event: EventCreationDto): Promise<boolean>
  getEvents(): Promise<Event[]>
  findEventById(id: string): Promise<Event | null>
  deleteEventById(id: string): Promise<void>
  eventExist(id: string): Promise<boolean>
}
