import { Exclude, Expose, Type } from 'class-transformer'
import { ApiObject } from '~/domain/base/api-object'
import { Groups } from '~/domain/base/groups'
import { prop, Ref } from '@typegoose/typegoose'
import { MotoCategory } from '../enums/moto-category'
import User from './user'
import Participant from './participant'
@Exclude()
export default class Event extends ApiObject<string> {
  @prop({ required: true, ref: () => User })
  @Expose({ groups: Groups.basicAll() })
  @Type(() => User)
  owner: Ref<User>

  @prop({ required: true, type: Participant, default: [] })
  @Expose({ groups: Groups.basicAll() })
  participants: Participant[]

  @prop({ required: true, type: String, enum: MotoCategory })
  @Expose({ groups: Groups.basicAll() })
  category: MotoCategory
}
