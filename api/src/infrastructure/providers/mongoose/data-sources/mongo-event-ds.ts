import { EventCreationDto, EventUpdateDto } from '~/domain/dtos/event-dto'
import Event from '~/domain/entities/event'
import { EventDataSource } from '~/infrastructure/interfaces/data-sources/event-ds'
import { EventModel } from '../schemas/event-schema'
import { UserModel } from '../schemas/user-schema'

export class MongoEventDataSource implements EventDataSource {
  async eventExist(id: string): Promise<boolean> {
    const res = await EventModel.exists({ _id: id })
    return res != null
  }

  async deleteById(id: string): Promise<void> {
    await EventModel.deleteOne({ _id: id })
  }

  async create(event: EventCreationDto): Promise<boolean> {
    const newEvent = new EventModel({ ...event })
    const res = await newEvent.save()
    return res !== null
  }

  async update(id: string, event: EventUpdateDto): Promise<boolean> {
    const res = await EventModel.updateOne({ _id: id }, event)
    return res !== null
  }

  async getAll(): Promise<Event[]> {
    const res = await EventModel.find({}).populate({ path: 'owner', model: UserModel }).lean().exec()
    return res
  }

  async getById(id: string): Promise<Event | null> {
    const res = await EventModel.findById(id).populate({ path: 'owner', model: UserModel }).lean().exec()
    return res
  }
}
