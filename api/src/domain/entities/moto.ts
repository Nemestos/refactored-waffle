import { Exclude, Expose } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { ApiObject } from '~/domain/base/api-object'
import { Groups } from '~/domain/base/groups'
import { prop } from '@typegoose/typegoose'
import { MotoCategory } from '../enums/moto-category'
@Exclude()
export default class Moto extends ApiObject<string> {
  @prop()
  @Expose({ groups: Groups.basicAll() })
  @IsOptional({ groups: [Groups.UPDATE] })
  @IsNotEmpty({ groups: [Groups.CREATE] })
  @IsString({ groups: [Groups.CREATE, Groups.UPDATE] })
  name: string

  @prop()
  @Expose({ groups: Groups.basicAll() })
  @IsOptional({ groups: [Groups.UPDATE] })
  @IsNotEmpty({ groups: [Groups.CREATE] })
  @IsString({ groups: [Groups.CREATE, Groups.UPDATE] })
  manufacturer: string

  @prop()
  @Expose({ groups: Groups.basicAll() })
  @IsOptional({ groups: [Groups.UPDATE] })
  @IsNotEmpty({ groups: [Groups.CREATE] })
  @IsString({ groups: [Groups.CREATE, Groups.UPDATE] })
  model: string

  @prop({ required: false, type: String, enum: MotoCategory })
  @Expose({ groups: Groups.basicAll() })
  @IsEnum(MotoCategory, {
    groups: Groups.basicAll()
  })
  @IsOptional({ groups: [Groups.UPDATE] })
  @IsNotEmpty({ groups: [Groups.CREATE] })
  category: MotoCategory
}
