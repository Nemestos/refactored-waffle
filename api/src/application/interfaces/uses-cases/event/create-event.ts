import { EventCreationDto } from '~/domain/dtos/event-dto'

export default interface CreateEventUseCase {
  execute(event: EventCreationDto): Promise<boolean>
}
