import { ClassConstructor, plainToInstance } from 'class-transformer'
import { ResponseStructure } from '~/domain/types/response-structure'

/**
 *
 * @param type the target class type
 * @param body the body to transform
 * @param groups the groups to take in count
 * @returns an array of date or just single data
 */
export function transform<T>(type: ClassConstructor<T>, body: T | T[], groups: string[]): ResponseStructure<T> {
  return Array.isArray(body)
    ? {
        object: 'list',
        data: body.map((item) => plainToInstance(type, item, { groups, excludeExtraneousValues: true }))
      }
    : plainToInstance(type, body, { groups, excludeExtraneousValues: true, enableImplicitConversion: false })
}
