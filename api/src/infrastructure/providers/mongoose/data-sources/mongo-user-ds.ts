import { UserCreationDto } from '~/domain/dtos/user-dto'
import User from '~/domain/entities/user'
import { UserDataSource } from '~/infrastructure/interfaces/data-sources/user-ds'
import { UserModel } from '~/infrastructure/providers/mongoose/schemas/user-schema'
import { MotoModel } from '../schemas/moto-schema'

export class MongoUserDataSource implements UserDataSource {
  async getByEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({ email })
  }

  async create(user: UserCreationDto): Promise<boolean> {
    const newUser = new UserModel({ ...user })
    const res = await newUser.save()
    return res !== null
  }

  async getAll(): Promise<User[]> {
    const res = await UserModel.find({}).populate({ path: 'motos', model: MotoModel }).lean().exec()
    return res
  }

  async getById(id: string): Promise<User | null> {
    const res = await UserModel.findById(id).populate({ path: 'motos', model: MotoModel }).lean().exec()
    return res
  }
}
