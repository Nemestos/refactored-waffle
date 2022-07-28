import User from '~/domain/entities/user'

export type UserCreationDto = Pick<User, 'email' | 'firstname' | 'surname' | 'password'>
export type UserUpdateDto = Pick<User, 'email' | 'firstname' | 'surname'>
export type UserSigninDto = Pick<User, 'email' | 'password'>
export type UserJwtPayloadDto = Pick<User, '_id' | 'email' | 'scopes'>
export type UserApiDto = Pick<User, '_id' | 'email' | 'firstname' | 'surname' | 'createdAt' | 'updatedAt'>
