import { ClassConstructor, instanceToPlain, plainToInstance } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'
import { Groups } from '~/domain/base/groups'

export function transform<T>(type: ClassConstructor<T>, body: T | T[], groups: string[]) {
  return Array.isArray(body)
    ? {
        object: 'list',
        data: body.map((item) =>
          plainToInstance(type, item, { groups, excludeExtraneousValues: true, enableImplicitConversion: true })
        )
      }
    : plainToInstance(type, body, { groups, excludeExtraneousValues: true, enableImplicitConversion: true })
}
