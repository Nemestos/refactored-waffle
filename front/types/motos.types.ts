import { IEntity } from './global.types'

export enum MotoCategory {
  Scooterette = 'Scooterette',
  Adventure = 'Adventure',
  Touring = 'Touring',
  Naked = 'Naked',
  Superbike = 'Superbike',
  Scooter = 'Scooter',
  Sports = 'Sports',
  Chopper = 'Chopper',
  Cruiser = 'Cruiser',
  Commuter = 'Commuter',
  Sports_Commuter = 'Sports_Commuter',
  Sports_Cruiser = 'Sports_Cruiser',
  Off_Road = 'Off_Road',
  Scrambler = 'Scrambler',
  Tourer = 'Tourer',
  Moped = 'Moped',
  Quad_Bike = 'Quad_Bike',
  Cafe_Racer = 'Cafe_Racer',
  Electric_Scooter = 'Electric_Scooter',
  Monkey = 'Monkey',
  Electric_Motorcycle = 'Electric_Motorcycle',
  Bobber = 'Bobber',
  Srambler = 'Srambler',
  Dirt_Bike = 'Dirt_Bike',
  Moto_Scooter = 'Moto_Scooter',
  Electric = 'Electric',
  Classic = 'Classic'
}

export interface IMoto extends IEntity {
  manufacturer: string
  model: string
  category: MotoCategory
}