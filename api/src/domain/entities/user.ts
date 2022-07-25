import { Exclude, Expose } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'
import { ApiObject } from '~/domain/base/api-object'
import { Groups } from '~/domain/base/groups'
import { prop } from '@typegoose/typegoose'
@Exclude()
export default class User extends ApiObject<string> {
  @prop()
  @Expose({ groups: Groups.all() })
  @IsOptional({ groups: [Groups.UPDATE] })
  @IsNotEmpty({ groups: [Groups.CREATE, Groups.AUTH] })
  @IsEmail({}, { groups: [Groups.CREATE, Groups.UPDATE, Groups.AUTH] })
  email: string

  @prop()
  @Expose({ groups: [Groups.CREATE, Groups.AUTH] })
  @IsNotEmpty({ groups: [Groups.CREATE, Groups.AUTH] })
  @IsString({ groups: [Groups.CREATE, Groups.AUTH] })
  @Length(8, 255, {
    groups: [Groups.CREATE]
  })
  password: string

  @prop()
  @Expose({ groups: [Groups.CREATE, Groups.READ, Groups.UPDATE] })
  @IsOptional({ groups: [Groups.UPDATE] })
  @IsNotEmpty({ groups: [Groups.CREATE] })
  @IsString({ groups: [Groups.CREATE, Groups.UPDATE] })
  @Length(1, 255, {
    groups: [Groups.CREATE, Groups.UPDATE]
  })
  firstname: string

  @prop()
  @Expose({ groups: [Groups.CREATE, Groups.READ, Groups.UPDATE] })
  @IsOptional({ groups: [Groups.UPDATE] })
  @IsNotEmpty({ groups: [Groups.CREATE] })
  @IsString({ groups: [Groups.CREATE, Groups.UPDATE] })
  @Length(1, 255, {
    groups: [Groups.CREATE, Groups.UPDATE]
  })
  surname: string
}
