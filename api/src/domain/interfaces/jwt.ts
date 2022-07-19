export interface Jwt<T> {
  generateToken(payload: T): string | Promise<string>
  verifyToken(token: string): T | Promise<T>
}
