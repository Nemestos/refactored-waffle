import Moto from '../entities/moto'

export type MotoCreationDto = Pick<Moto, 'category' | 'manufacturer' | 'model' | 'name'>
export type MotoUpdateDto = Pick<Moto, 'category' | 'manufacturer' | 'model' | 'name'>
export type MotoApiDto = Pick<Moto, '_id' | 'category' | 'manufacturer' | 'model' | 'name' | 'createdAt' | 'updatedAt'>
