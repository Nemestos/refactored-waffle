import User from '~/domain/entities/user'
import { UserDataSource } from '~/infrastructure/interfaces/data-sources/user-ds'
import { UserModel } from '~/infrastructure/providers/mongoose/schemas/user-schema'

export class MongoUserDataSource implements UserDataSource {
  async create(user: User): Promise<boolean> {
    const newUser = new UserModel({ ...user })
    const res = await newUser.save()
    return res !== null
  }

  async getAll(): Promise<User[]> {
    const res = await UserModel.find({})
    return res.map((item) => {
      return {
        id: item._id.toString(),
        ...item
      } as User
    })
  }
}
