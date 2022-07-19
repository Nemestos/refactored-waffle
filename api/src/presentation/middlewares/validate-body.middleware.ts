import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { ErrorCode } from '~/domain/errors/error-code'
import { ErrorException } from '~/domain/errors/error-exception'

export function validateBody<T>(targetClass: ClassConstructor<T>, groups: string[] = []) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    req.body = Object.setPrototypeOf(req.body, targetClass.prototype)
    const errors = await validate(req.body, {
      groups,
      whitelist: true,
      forbidNonWhitelisted: true
    })
    if (errors.length) {
      throw new ErrorException(ErrorCode.ValidationError, errors)
    }
    req.body = plainToInstance(targetClass, req.body, { groups })
    next()
  }
}
