import { Exclude, Expose, Transform } from 'class-transformer'
import { Groups } from '~/domain/base/groups'
import 'reflect-metadata'
@Exclude()
export class ApiObject<T> {
  @Expose({ groups: [Groups.READ] })
  @Transform((value) => {
    if ('value' in value) {
      return value.obj[value.key].toString()
    }
  })
  _id?: T

  @Exclude()
  public __v?: number

  @Expose({ groups: [Groups.READ] })
  createdAt?: string

  @Expose({ groups: [Groups.READ] })
  updatedAt?: string
}
