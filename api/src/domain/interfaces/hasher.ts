export interface PasswordHasher {
  passwordHash(plain: string): string | Promise<string>
  comparePasswords(plain: string, hashed: string): boolean | Promise<boolean>
}
