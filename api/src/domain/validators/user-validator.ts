import { IsEmail, IsString, MinLength } from 'class-validator'
import User from '~/domain/entities/user'

export class UserCreateValidator implements Pick<User, 'email' | 'password' | 'firstname' | 'surname'> {
  @IsEmail()
  email: string

  @IsString()
  @MinLength(8)
  password: string

  @IsString()
  firstname: string

  @IsString()
  surname: string
}
