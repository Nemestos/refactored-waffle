import { Exclude, Expose } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'
import { ApiObject } from '~/domain/base/api-object'
import { Groups } from '~/domain/base/groups'
import { prop, Ref } from '@typegoose/typegoose'
import { DefaultBasicUserScope, Scopes } from '~/domain/enums/scope-enum'
import Moto from './moto'
@Exclude()
export default class User extends ApiObject<string> {
  @prop()
  @Expose({ groups: Groups.authAll() })
  @IsOptional({ groups: [Groups.UPDATE] })
  @IsNotEmpty({ groups: [Groups.CREATE, Groups.AUTH] })
  @IsEmail({}, { groups: [Groups.CREATE, Groups.UPDATE, Groups.AUTH] })
  public email: string

  @prop()
  @Expose({ groups: [Groups.CREATE, Groups.AUTH] })
  @IsNotEmpty({ groups: [Groups.CREATE, Groups.AUTH] })
  @IsString({ groups: [Groups.CREATE, Groups.AUTH] })
  @Length(8, 255, {
    groups: [Groups.CREATE]
  })
  public password: string

  @prop()
  @Expose({ groups: Groups.basicAll() })
  @IsOptional({ groups: [Groups.UPDATE] })
  @IsNotEmpty({ groups: [Groups.CREATE] })
  @IsString({ groups: [Groups.CREATE, Groups.UPDATE] })
  @Length(1, 255, {
    groups: [Groups.CREATE, Groups.UPDATE]
  })
  public firstname: string

  @prop()
  @Expose({ groups: Groups.basicAll() })
  @IsOptional({ groups: [Groups.UPDATE] })
  @IsNotEmpty({ groups: [Groups.CREATE] })
  @IsString({ groups: [Groups.CREATE, Groups.UPDATE] })
  @Length(1, 255, {
    groups: [Groups.CREATE, Groups.UPDATE]
  })
  public surname: string

  @prop({ required: true, type: String, enum: Scopes, default: DefaultBasicUserScope })
  @Expose({ groups: [Groups.READ] })
  public scopes: Scopes[]

  @prop({ required: false, ref: () => Moto })
  @Expose({ groups: [Groups.READ] })
  public motos?: Ref<Moto>[]
}
