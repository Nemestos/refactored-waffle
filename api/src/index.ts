import { config } from './config'
import { GetAllUsers } from './application/use-cases/get-all-users'
import UsersRouter from './presentation/routers/user-router'
import server from './server'
import { UserRepositoryImpl } from '~/infrastructure/repositories/user-repository'
import { MongoUserDataSource } from '~/infrastructure/providers/mongoose/data-sources/mongo-user-ds'
import { connect } from 'mongoose'
import { logger } from '~/utils/logger'
import { exit } from 'process'
;(async () => {
  await connect(`mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB}`)
    .then(() => logger.info('successfully connected to db'))
    .catch((reason) => {
      logger.error(reason)
      exit()
    })
  const userMiddleware = UsersRouter(new GetAllUsers(new UserRepositoryImpl(new MongoUserDataSource())))
  server.use('/user', userMiddleware)
  server.listen(config.PORT, () => logger.info('application running without eating rabbits'))
})()
