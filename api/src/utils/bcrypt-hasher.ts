import { PasswordHasher } from '~/domain/interfaces/hasher'
import bcrypt from 'bcrypt'

export class BcryptHasher implements PasswordHasher {
  async passwordHash(plain: string): Promise<string> {
    return await bcrypt.hash(plain, 10)
  }

  async comparePasswords(plain: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(plain, hashed)
  }
}
