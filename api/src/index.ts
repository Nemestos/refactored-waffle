import { config } from './config'
import { GetAllUsers } from './application/use-cases/user/get-all-users'
// import UsersRouter from './presentation/routers/user-router'
import server from './server'
import { UserRepositoryImpl } from '~/infrastructure/repositories/user-repository'
import { MongoUserDataSource } from '~/infrastructure/providers/mongoose/data-sources/mongo-user-ds'
import { connect } from 'mongoose'
import { logger } from '~/utils/logger'
import { exit } from 'process'
import AuthRouter from '~/presentation/routers/auth-router'
import { Signup } from '~/application/use-cases/auth/signup'
import { BcryptHasher } from '~/utils/bcrypt-hasher'
import { errorHandler } from '~/presentation/middlewares/error-handler.middleware'
import { Signin } from '~/application/use-cases/auth/signin'
import { UserJwt } from '~/utils/user-jwt'
import UsersRouter from '~/presentation/routers/user-router'
;(async () => {
  await connect(`mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB}`)
    .then(() => logger.info('successfully connected to db'))
    .catch((reason) => {
      logger.error(reason)
      exit()
    })
  const userRepo = new UserRepositoryImpl(new MongoUserDataSource())
  const passwordHasher = new BcryptHasher()
  const jwt = new UserJwt()
  const userMiddleware = UsersRouter(new GetAllUsers(userRepo), jwt)
  const authMiddleware = AuthRouter(new Signup(userRepo, passwordHasher), new Signin(userRepo, passwordHasher, jwt))
  server.use('/users', userMiddleware)
  server.use('/auth', authMiddleware)
  server.use(errorHandler)
  server.listen(config.PORT, () => logger.info('application running without eating rabbits'))
})()
