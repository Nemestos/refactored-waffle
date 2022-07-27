import Event from '../entities/event'

export type EventCreationDto = Pick<Event, 'owner' | 'participants' | 'category'>
export type EventApiDto = Pick<Event, '_id' | 'owner' | 'participants' | 'category' | 'createdAt' | 'updatedAt'>
