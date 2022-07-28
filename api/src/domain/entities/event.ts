import { Exclude, Expose, Type } from 'class-transformer'
import { ApiObject } from '~/domain/base/api-object'
import { Groups } from '~/domain/base/groups'
import { prop, Ref } from '@typegoose/typegoose'
import { MotoCategory } from '../enums/moto-category'
import User from './user'
import Participant from './participant'
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator'
@Exclude()
export default class Event extends ApiObject<string> {
  @prop({ required: true, ref: () => User })
  @Expose({ groups: [Groups.READ] })
  @Type(() => User)
  owner: Ref<User>

  @prop({ required: true, type: Participant, default: [] })
  @Expose({ groups: Groups.basicAll() })
  @IsOptional({ groups: [Groups.UPDATE, Groups.CREATE] })
  @IsNotEmpty({ groups: [Groups.CREATE] })
  @Type(() => Participant)
  participants: Participant[]

  @prop({ required: true, type: String, enum: MotoCategory })
  @Expose({ groups: Groups.basicAll() })
  @IsEnum(MotoCategory, {
    groups: Groups.basicAll(),
    message: (validationArguments) => {
      return `${validationArguments.value} is not a valid moto category`
    }
  })
  @IsOptional({ groups: [Groups.UPDATE] })
  @IsNotEmpty({ groups: [Groups.CREATE] })
  category: MotoCategory
}
