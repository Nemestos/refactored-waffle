import { ClassConstructor, plainToInstance } from 'class-transformer'
import { ResponseStructure } from '~/domain/types/response-structure'

export function transform<T>(type: ClassConstructor<T>, body: T | T[], groups: string[]): ResponseStructure<T> {
  return Array.isArray(body)
    ? {
        object: 'list',
        data: body.map((item) =>
          plainToInstance(type, item, { groups, excludeExtraneousValues: true, enableImplicitConversion: false })
        )
      }
    : plainToInstance(type, body, { groups, excludeExtraneousValues: true, enableImplicitConversion: false })
}
