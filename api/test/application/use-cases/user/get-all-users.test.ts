import { GetAllUsers } from '~/application/use-cases/user/get-all-users'
import User from '~/domain/entities/user'
import UserRepository from '~/infrastructure/interfaces/repositories/user-repository'

describe('Get all users use case', () => {
  class MockUserRepository implements UserRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findUserByEmail(_email: string): Promise<User | null> {
      throw new Error('Method not implemented.')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createUser(_user: User): Promise<boolean> {
      throw new Error('Method not implemented.')
    }

    getUsers(): Promise<User[]> {
      throw new Error('Method not implemented.')
    }
  }

  let mockUserRepository: UserRepository
  beforeEach(() => {
    jest.clearAllMocks()
    mockUserRepository = new MockUserRepository()
  })

  test('should return all users', async () => {
    const expectedData: User[] = [
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
    jest.spyOn(mockUserRepository, 'getUsers').mockImplementation(() => Promise.resolve(expectedData))
    const getAllUsersUseCase = new GetAllUsers(mockUserRepository)
    const result = await getAllUsersUseCase.execute()
    expect(result).toStrictEqual(expectedData)
  })
})
