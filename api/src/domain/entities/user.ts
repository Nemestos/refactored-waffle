import { BaseEntity } from '~/domain/base/base-entity'
import { TimelineEntity } from '~/domain/base/timeline-entity'

export default interface User extends BaseEntity<string>, TimelineEntity {
  email: string
  password: string
  firstname: string
  surname: string
}
