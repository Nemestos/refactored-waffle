import User from '~/domain/entities/user'

export type UserCreationDto = Pick<User, 'email' | 'firstname' | 'surname' | 'password'>
export type UserApiDto = Pick<User, '_id' | 'email' | 'firstname' | 'surname' | 'createdAt' | 'updatedAt'>
