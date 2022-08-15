import jwt from 'jsonwebtoken'
import { config } from '~/config'
import { Jwt } from '~/domain/interfaces/jwt'

import { UserJwtPayloadDto } from '~/domain/dtos/user-dto'
import { client } from './cache'

export class UserJwt implements Jwt<UserJwtPayloadDto> {
  refreshList = new Map<string, object>()

  isRefreshExist(token: string): boolean {
    return this.refreshList.has(token)
  }

  async addToRefreshList(refresh: string, token: string) {
    this.refreshList.set(refresh, {
      token,
      refresh
    })
    await this.storeRefreshList()
  }

  async storeRefreshList() {
    const stringified = JSON.stringify(Array.from(this.refreshList.entries()))
    await client.set('refreshList', stringified)
  }

  async parseRefreshList(): Promise<Map<string, object>> {
    const stringified = (await client.get('refreshList')) || '[]'
    return new Map(JSON.parse(stringified))
  }

  async loadOrInitRefreshList(): Promise<object> {
    this.refreshList = await this.parseRefreshList()
    return this.refreshList
  }

  generateRefreshToken(payload: UserJwtPayloadDto): string {
    return jwt.sign({ _id: payload._id, email: payload.email, scopes: payload.scopes }, config.JWT_KEY, {
      expiresIn: '30d'
    })
  }

  generateAccessToken(payload: UserJwtPayloadDto): string {
    return jwt.sign({ _id: payload._id, email: payload.email, scopes: payload.scopes }, config.JWT_KEY, {
      expiresIn: '1h'
    })
  }

  verifyToken(token: string): UserJwtPayloadDto | null {
    try {
      const tokenData = jwt.verify(token, config.JWT_KEY)
      return tokenData as UserJwtPayloadDto
    } catch (err) {
      return null
    }
  }
}
