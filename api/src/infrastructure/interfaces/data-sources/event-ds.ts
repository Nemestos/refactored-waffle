import { EventCreationDto, EventUpdateDto } from '~/domain/dtos/event-dto'
import Event from '~/domain/entities/event'

/**
 * Base user date sources to handle multiples SGBD(mongo,postgres...)
 */
export interface EventDataSource {
  create(event: EventCreationDto): Promise<boolean>
  update(id: string, event: EventUpdateDto): Promise<boolean>
  getAll(): Promise<Event[]>
  getById(id: string): Promise<Event | null>
  deleteById(id: string): void
  eventExist(id: string): Promise<boolean>
}
