import { Exclude, Expose, Type } from 'class-transformer'
import { ApiObject } from '~/domain/base/api-object'
import { prop, Ref } from '@typegoose/typegoose'
import User from './user'
import Moto from './moto'
import { IsNotEmpty, IsOptional } from 'class-validator'
import { Groups } from '../base/groups'
@Exclude()
export default class Participant extends ApiObject<string> {
  @prop({ required: true, ref: () => User })
  @Expose({ groups: Groups.basicAll() })
  @IsOptional({ groups: [Groups.UPDATE] })
  @IsNotEmpty({ groups: [Groups.CREATE] })
  @Type(() => User)
  user: Ref<User>

  @prop({ required: true, ref: () => Moto })
  @Expose({ groups: Groups.basicAll() })
  @IsOptional({ groups: [Groups.UPDATE] })
  @IsNotEmpty({ groups: [Groups.CREATE] })
  @Type(() => Moto)
  moto: Ref<Moto>
}
