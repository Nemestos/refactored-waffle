import { Card, CardActions, CardContent, Chip, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDeleteUserMutation } from '../lib/api/userApi'
import { IUser } from '../types/user.types'
import { ConfirmationModal } from './ConfirmationModal'
import { ScopeButton } from './ScopeButton'
import { UpdateUserModal } from './UpdateUserModal'

export interface UserSearchCardProps {
  user: IUser
}
function UserSearchCard({ user }: UserSearchCardProps) {
  const router = useRouter()
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
  const handleViewUser = () => {
    router.push(`/users/${user._id}`)
  }
  return (
    <Grid item xs={2}>
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="GrayText" gutterBottom>
            #{user._id}
          </Typography>
          <Typography variant="h5" component="div">
            {user.firstname} {user.surname}
          </Typography>
          <Grid container gap={1}>
            {user.scopes.map((scope) => (
              <Grid item>
                <Chip label={scope} />
              </Grid>
            ))}
          </Grid>
        </CardContent>
        <CardActions>
          <ConfirmationModal
            actionType="Delete"
            entityType="User"
            entity={user}
            requiredScope="can_delete_users"
            onTrigger={handleUserDelete}
          />
          <UpdateUserModal user={user} />

          <ScopeButton content="View" requiredScope="can_read_users" onClick={handleViewUser} />
        </CardActions>
      </Card>
    </Grid>
  )
}

export default UserSearchCard
