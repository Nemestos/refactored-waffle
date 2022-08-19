import Event from '~/domain/entities/event'

export default interface GetUserEventsUseCase {
  execute(userId: string): Promise<Event[]>
}
