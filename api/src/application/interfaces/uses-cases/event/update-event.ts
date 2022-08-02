import { EventUpdateDto } from '~/domain/dtos/event-dto'

export default interface UpdateEventUseCase {
  execute(id: string, event: EventUpdateDto): Promise<boolean>
}
