import User from '~/domain/entities/user'
import { UserDataSource } from '../interfaces/data-sources/user-ds'
import UserRepository from '../interfaces/repositories/user-repository'
import { UserRepositoryImpl } from '~/infrastructure/repositories/user-repository'
import { UserCreationDto } from '~/domain/dtos/user-dto'

class MockUserDataSource implements UserDataSource {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getByEmail(email: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(user: User): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  getAll(): Promise<User[]> {
    throw new Error('Method not implemented.')
  }
}

describe('User Repository', () => {
  let mockUserDataSource: UserDataSource
  let userRepository: UserRepository

  beforeEach(() => {
    jest.clearAllMocks()
    mockUserDataSource = new MockUserDataSource()
    userRepository = new UserRepositoryImpl(mockUserDataSource)
  })
  describe('getAllUsers', () => {
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

      jest.spyOn(mockUserDataSource, 'getAll').mockImplementation(() => Promise.resolve(expectedData))
      const res = await userRepository.getUsers()
      expect(res).toBe(expectedData)
    })
  })

  describe('createUser', () => {
    test('should return true', async () => {
      const inputData: UserCreationDto = {
        email: 'etna@gmail.com',
        firstname: 'Léo',
        surname: 'Turpin',
        password: 'password'
      }
      jest.spyOn(mockUserDataSource, 'create').mockImplementation(() => Promise.resolve(true))
      const res = await userRepository.createUser(inputData)
      expect(res).toBe(true)
    })
  })
})
