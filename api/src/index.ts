import { config } from './config'
import { GetAllUsers } from './application/use-cases/user/get-all-users'
// import UsersRouter from './presentation/routers/user-router'
import server from './server'
import { UserRepositoryImpl } from '~/infrastructure/repositories/user-repository'
import { MongoUserDataSource } from '~/infrastructure/providers/mongoose/data-sources/mongo-user-ds'
import { logger } from '~/utils/logger'
import AuthRouter from '~/presentation/routers/auth-router'
import { Signup } from '~/application/use-cases/auth/signup'
import { BcryptHasher } from '~/utils/bcrypt-hasher'
import { errorHandler } from '~/presentation/middlewares/error-handler.middleware'
import { Signin } from '~/application/use-cases/auth/signin'
import { UserJwt } from '~/utils/user-jwt'
import UsersRouter from '~/presentation/routers/user-router'
import { GetUserById } from './application/use-cases/user/get-user-by-id'
import { connectToMongo } from './infrastructure/providers/mongoose/connector'
import { DeleteUserById } from './application/use-cases/user/delete-user-by-id'
;(async () => {
  await connectToMongo()
  const userRepo = new UserRepositoryImpl(new MongoUserDataSource())
  const passwordHasher = new BcryptHasher()
  const jwt = new UserJwt()
  const userMiddleware = UsersRouter(
    new GetAllUsers(userRepo),
    new GetUserById(userRepo),
    new DeleteUserById(userRepo),
    jwt
  )
  const authMiddleware = AuthRouter(new Signup(userRepo, passwordHasher), new Signin(userRepo, passwordHasher, jwt))
  server.use('/users', userMiddleware)
  server.use('/auth', authMiddleware)
  server.use(errorHandler)
  server.listen(config.PORT, () => logger.info('application running without eating rabbits'))
})()
