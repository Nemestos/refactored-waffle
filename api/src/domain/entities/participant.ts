import { Exclude } from 'class-transformer'
import { ApiObject } from '~/domain/base/api-object'
import { prop, Ref } from '@typegoose/typegoose'
import User from './user'
import Moto from './moto'
@Exclude()
export default class Participant extends ApiObject<string> {
  @prop({ required: true, ref: () => User })
  userId: Ref<User>

  @prop({ required: true, ref: () => Moto })
  motoId: Ref<Moto>
}
