import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDeleteUserMutation } from '../lib/api/userApi'
import { RootState, useAppSelector } from '../lib/store'
import { IUser } from '../types/user.types'

export interface UserSearchCardProps {
  user: IUser
}
function UserSearchCard({ user }: UserSearchCardProps) {
  const me: IUser = useAppSelector((state: RootState) => state.userState.user)
  const [deleteUser, { isError, isSuccess, isLoading }] = useDeleteUserMutation()
  useEffect(() => {
    if (isError) {
      toast.error(`Cant delete user ${user._id}`)
    }
    if (isSuccess) {
      toast.success(`Successful delete ${user._id}`)
    }
  }, [isLoading])

  const handleUserDelete = () => {
    deleteUser(user._id)
  }
  return (
    <div className="card card-normal w-96 bg-base-200 shadow-xl" key={user.id}>
      <div className="card-body">
        {me.scopes.includes('can_delete_users') && (
          <div className="card-actions justify-end" onClick={handleUserDelete}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )}
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
