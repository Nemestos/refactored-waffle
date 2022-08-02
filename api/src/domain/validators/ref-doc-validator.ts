import { getModelForClass, Ref } from '@typegoose/typegoose'
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'
import { isValidObjectId } from 'mongoose'

@ValidatorConstraint({ name: 'RefDoc', async: true })
export class RefDocValidator implements ValidatorConstraintInterface {
  async validate(refId: Ref<any>, validationArguments?: ValidationArguments | undefined): Promise<boolean> {
    const modelClass = validationArguments?.constraints[0]
    if (!isValidObjectId(refId)) {
      return Promise.resolve(false)
    }
    const isExist = getModelForClass(modelClass).exists({ _id: refId })
    return isExist
  }

  defaultMessage(): string {
    return 'Cant find referenced document for this resource'
  }
}

export function RefDocExists(modelClass: any, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'RefDocExists',
      target: object.constructor,
      propertyName,
      constraints: [modelClass],
      options: validationOptions,
      validator: RefDocValidator
    })
  }
}
