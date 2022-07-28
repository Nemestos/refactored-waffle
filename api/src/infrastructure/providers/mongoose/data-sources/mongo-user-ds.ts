import { UserCreationDto, UserUpdateDto } from '~/domain/dtos/user-dto'
import User from '~/domain/entities/user'
import { UserDataSource } from '~/infrastructure/interfaces/data-sources/user-ds'
import { UserModel } from '~/infrastructure/providers/mongoose/schemas/user-schema'
import { MotoModel } from '../schemas/moto-schema'

export class MongoUserDataSource implements UserDataSource {
  async userExist(id: string): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = await UserModel.exists({ _id: id }).catch((_err) => null)
    return res != null
  }

  async deleteById(id: string): Promise<void> {
    await UserModel.deleteOne({ _id: id })
  }

  async create(user: UserCreationDto): Promise<boolean> {
    const newUser = new UserModel({ ...user })
    const res = await newUser.save()
    return res !== null
  }

  async update(id: string, user: UserUpdateDto): Promise<boolean> {
    const res = await UserModel.updateOne({ _id: id }, user)
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

  async getByEmail(email: string): Promise<User | null> {
    const res = await UserModel.findOne({ email }).populate({ path: 'motos', model: MotoModel }).lean().exec()
    return res
  }
}
