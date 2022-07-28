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
import EventsRouter from './presentation/routers/event-router'
import { GetAllEvents } from './application/use-cases/event/get-all-events'
import { MongoEventDataSource } from './infrastructure/providers/mongoose/data-sources/mongo-event-ds'
import { EventRepositoryImpl } from './infrastructure/repositories/event-repository'
import { DeleteEventById } from './application/use-cases/event/delete-event-by-id'
import { GetEventById } from './application/use-cases/event/get-event-by-id'
import { CreateEvent } from './application/use-cases/event/create-event'
;(async () => {
  await connectToMongo()
  const userRepo = new UserRepositoryImpl(new MongoUserDataSource())
  const eventRepo = new EventRepositoryImpl(new MongoEventDataSource())
  const passwordHasher = new BcryptHasher()
  const jwt = new UserJwt()
  const userMiddleware = UsersRouter(
    new GetAllUsers(userRepo),
    new GetUserById(userRepo),
    new DeleteUserById(userRepo),
    jwt
  )
  const eventsMiddleware = EventsRouter(
    new CreateEvent(eventRepo, userRepo),
    new GetAllEvents(eventRepo),
    new GetEventById(eventRepo),
    new DeleteEventById(eventRepo),
    jwt
  )
  const authMiddleware = AuthRouter(new Signup(userRepo, passwordHasher), new Signin(userRepo, passwordHasher, jwt))
  server.use('/users', userMiddleware)
  server.use('/auth', authMiddleware)
  server.use('/events', eventsMiddleware)
  server.use(errorHandler)
  server.listen(config.PORT, () => logger.info('application running without eating rabbits'))
})()
