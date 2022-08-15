export interface Jwt<T> {
  generateAccessToken(payload: T): string
  generateRefreshToken(payload: T): string
  verifyToken(token: string): T | null
  loadOrInitRefreshList(): object
  addToRefreshList(refresh: string, token: string): Promise<void>
  isRefreshExist(token: string): boolean
}
