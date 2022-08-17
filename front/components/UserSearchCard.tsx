import { IUser } from '../types/user.types'

export interface UserSearchCardProps {
  user: IUser
}
function UserSearchCard({ user }: UserSearchCardProps) {
  return (
    <div className="card card-normal w-96 bg-base-200 shadow-xl" key={user.id}>
      <div className="card-body">
        <h2 className="card-title self-center">
          {user.firstname} {user.surname}
        </h2>
        <h3 className="card-title self-center">{user.email}</h3>
        <div className="card-actions justify-end">
          {user.scopes.map((scope) => (
            <div className="badge badge-outline">{scope}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserSearchCard
