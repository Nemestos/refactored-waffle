import { mongoose } from '@typegoose/typegoose'
import { logger } from '~/utils/logger'
import { connectToMongo } from '../connector'
// ;(async () => {
//   await connectToMongo()
// })()

export async function clear() {
  mongoose.connection.db.dropDatabase()
  logger.info('dropping database')
}

export async function usersSeed() {}

export async function seed() {
  logger.info('seed')
}

export async function test() {
  await connectToMongo()
}
