import { mongoose } from '@typegoose/typegoose'
import { config } from '~/config'
import { faker } from '@faker-js/faker'
import { connectToMongo } from '~/infrastructure/providers/mongoose/connector'
import { UserModel } from '~/infrastructure/providers/mongoose/schemas/user-schema'
import { BcryptHasher } from '~/utils/bcrypt-hasher'
import { AdminUserScope, DefaultBasicUserScope } from '~/domain/enums/scope-enum'
import { logger } from '~/utils/logger'
import { getMotos, MotoDataset } from '~/infrastructure/providers/datas/motos-dataset-reader'
import { choices } from '~/utils/array'
import { MotoModel } from '~/infrastructure/providers/mongoose/schemas/moto-schema'
import Moto from '~/domain/entities/moto'
import { MotoCategory } from '~/domain/enums/moto-category'

const USERS_COUNT = 10
const MOTOS_COUNT = 5
const USERS_MOTOS = 2

;(async function () {
  await connectToMongo()
  await clear()
  await main()
})()

export async function clear() {
  await mongoose.connection.db.dropDatabase()
  logger.info('database dropped')
}

export async function seedUsers() {
  const hasher = new BcryptHasher()
  UserModel.create({
    email: 'admin@example.com',
    password: await hasher.passwordHash(config.ADMIN_PASSWORD),
    firstname: faker.name.firstName(),
    surname: faker.name.lastName(),
    scopes: AdminUserScope,
    motos: []
  })
  logger.info('admin created')
  const users = []
  const userHashed = await hasher.passwordHash(config.ADMIN_PASSWORD)
  for (let i = 0; i < USERS_COUNT; i++) {
    const user = {
      email: faker.internet.email(),
      password: userHashed,
      firstname: faker.name.firstName(),
      surname: faker.name.lastName(),
      scopes: DefaultBasicUserScope,
      motos: []
    }
    users.push(user)
  }

  UserModel.insertMany(users)
  logger.info(`${USERS_COUNT} users created`)
}
export async function seedMotos() {
  const motos = await getMotos()
  const randomsMotos = choices(motos, MOTOS_COUNT)
  const randomMotosTyped = randomsMotos.map<MotoDataset>((moto: MotoDataset) => {
    return {
      category: MotoCategory[moto.body_type || MotoCategory.Classic],
      manufacturer: moto.company_name,
      model: moto.model
    } as Moto
  })
  MotoModel.insertMany(randomMotosTyped)
  logger.info(`${MOTOS_COUNT} motos created`)
}

export async function addMotosToUsers() {
  const motos = await MotoModel.find({}).exec()
  const users = await UserModel.find({}).exec()
  logger.info(motos)
  users.forEach((user) => {
    for (let i = 0; i < USERS_MOTOS; i++) {
      const randomMoto = motos[Math.floor(Math.random() * motos.length)]
      user.motos.push(randomMoto._id)
    }
    user.save()
  })
}
export async function seed() {
  await seedMotos()
  await seedUsers()
  await addMotosToUsers()
}

export async function main() {
  const args = process.argv
  const action = args[2]

  switch (action) {
    case 'clear':
      await clear()
      break
    case 'all':
      await seed()
      break
    case 'users':
      await seedUsers()
      break
    case 'motos':
      await seedMotos()
      break
    case 'link':
      await addMotosToUsers()
      break
    default:
      break
  }
}
