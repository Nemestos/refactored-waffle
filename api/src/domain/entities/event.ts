import { Exclude, Expose } from 'class-transformer'
import { ApiObject } from '~/domain/base/api-object'
import { Groups } from '~/domain/base/groups'
import { prop, Ref } from '@typegoose/typegoose'
import { MotoCategory } from '../enums/moto-category'
import User from './user'
import Participant from './participant'
import mongoose from 'mongoose'
@Exclude()
export default class Event extends ApiObject<string> {
  @prop({ required: true, ref: () => User })
  @Expose({ groups: Groups.basicAll() })
  owner: Ref<User>

  @prop({ required: true, type: Participant, default: [] })
  @Expose({ groups: Groups.basicAll() })
  participants: mongoose.Types.Array<Participant>

  @prop({ required: true, type: String, enum: MotoCategory })
  @Expose({ groups: Groups.basicAll() })
  category: MotoCategory
}
