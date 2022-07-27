import Event from '~/domain/entities/event'

export default interface GetEventByIdUseCase {
  execute(id: string): Promise<Event | null>
}
