import Event from '~/domain/entities/event'

export default interface CreateEventUseCase {
  execute(event: Event): Promise<boolean>
}
