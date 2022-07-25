import request from 'supertest'
import User from '~/domain/entities/user'
import UsersRouter from '~/presentation/routers/user-router'
import { StatusCodes } from 'http-status-codes'
import server from '~/server'
import GetAllUsersUseCase, { GetAllUsersErrors } from '~/application/interfaces/uses-cases/user/get-all-users'
import { UserApiDto } from '~/domain/dtos/user-dto'

class MockGetAllUsersUseCase implements GetAllUsersUseCase {
  execute(): Promise<User[]> {
    throw new Error('not impl')
  }
}

describe('User Router', () => {
  let mockGetAllUsersUseCase: GetAllUsersUseCase
  beforeAll(() => {
    mockGetAllUsersUseCase = new MockGetAllUsersUseCase()
    server.use('/users', UsersRouter(mockGetAllUsersUseCase))
  })
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /users', () => {
    test('should return 200 with users data', async () => {
      const mockedData: User[] = [
        {
          _id: '1',
          email: 'etna@gmail.com',
          firstname: 'Léo',
          surname: 'Turpin',
          password: 'password',
          createdAt: '2022-01-01',
          updatedAt: '2022-01-01'
        }
      ]
      const expectedData: UserApiDto[] = mockedData.map((user) => user as UserApiDto)
      jest.spyOn(mockGetAllUsersUseCase, 'execute').mockResolvedValue(mockedData)
      const resp = await request(server).get('/users')
      expect(resp.status).toBe(StatusCodes.OK)
      expect(mockGetAllUsersUseCase.execute).toBeCalledTimes(1)
      expect(resp.body).toStrictEqual(expectedData)
    })
    test('should return 500 on use case error', async () => {
      jest.spyOn(mockGetAllUsersUseCase, 'execute').mockRejectedValue(Error())
      const resp = await request(server).get('/users')
      expect(resp.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
      expect(resp.body).toStrictEqual({ message: GetAllUsersErrors.INTERNAL_SERVER_ERROR })
    })
  })
})
