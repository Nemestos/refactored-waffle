import { MotoCreationDto, MotoUpdateDto } from '~/domain/dtos/moto-dto'
import Moto from '~/domain/entities/moto'
import { MotoDataSource } from '~/infrastructure/interfaces/data-sources/moto-ds'
import { MotoModel } from '../schemas/moto-schema'

export class MongoMotoDataSource implements MotoDataSource {
  async motoExist(id: string): Promise<boolean> {
    const res = await MotoModel.exists({ _id: id })
    return res != null
  }

  async deleteById(id: string): Promise<void> {
    await MotoModel.deleteOne({ _id: id })
  }

  async create(moto: MotoCreationDto): Promise<boolean> {
    const newMoto = new MotoModel({ ...moto })
    const res = await newMoto.save()
    return res !== null
  }

  async update(id: string, moto: MotoUpdateDto): Promise<boolean> {
    const res = await MotoModel.updateOne({ _id: id }, moto)
    return res !== null
  }

  async getAll(): Promise<Moto[]> {
    const res = await MotoModel.find({}).lean().exec()
    return res
  }

  async getById(id: string): Promise<Moto | null> {
    const res = await MotoModel.findById(id).lean().exec()
    return res
  }

  async getByManufacturer(manufacturer: string): Promise<Moto[]> {
    const res = await MotoModel.find({ manufacturer }).lean().exec()
    return res
  }
}
