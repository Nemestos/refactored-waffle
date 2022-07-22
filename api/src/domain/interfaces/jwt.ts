export interface Jwt<T> {
  generateToken(payload: T): string
  verifyToken(token: string): T
}
