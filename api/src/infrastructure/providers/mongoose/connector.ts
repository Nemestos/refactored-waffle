import { connect } from 'mongoose'
import { exit } from 'process'
import { config } from '~/config'
import { logger } from '~/utils/logger'

export async function connectToMongo() {
  await connect(`mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB}`)
    .then(() => logger.info('successfully connected to db'))
    .catch((reason) => {
      logger.error(reason)
      exit()
    })
}
