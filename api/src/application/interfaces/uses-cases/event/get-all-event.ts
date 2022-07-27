import Event from '~/domain/entities/event'

export default interface GetAllEventUseCase {
  execute(): Promise<Event[]>
}
