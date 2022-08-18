import { Card, CardActions, CardContent, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDeleteMotoMutation } from '../lib/api/motoApi'
import { useDeleteMotoOfUserMutation } from '../lib/api/userApi'
import { IMoto } from '../types/motos.types'
import { ConfirmationModal } from './ConfirmationModal'

export interface UserSearchCardProps {
  moto: IMoto
  userId?: string
}
function MotoSearchCard({ moto, userId }: UserSearchCardProps) {
  const router = useRouter()
  const [deleteMotoUser, deleteMotoUserState] = useDeleteMotoOfUserMutation()
  const [deleteMoto, deleteMotoState] = useDeleteMotoMutation()
  useEffect(() => {
    if (deleteMotoUserState.isError || deleteMotoState.isError) {
      toast.error(`Cant delete moto ${moto._id}`)
    }
    if (deleteMotoUserState.isSuccess || deleteMotoState.isSuccess) {
      toast.success(`Successful delete ${moto._id}`)
    }
  }, [deleteMotoState.isLoading, deleteMotoUserState.isLoading])

  const handleMotoDelete = () => {
    if (userId) {
      deleteMotoUser({ userId, motoId: moto._id })
    } else {
      deleteMoto(moto._id)
    }
  }
  const handleViewUser = () => {
    router.push(`/motos/${moto._id}`)
  }
  return (
    <Grid item xs={2}>
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="GrayText" gutterBottom>
            #{moto._id}
          </Typography>
          <Typography variant="h5" component="div">
            {moto.model} / {moto.manufacturer}
          </Typography>
          <Typography variant="h6" component="div">
            ({moto.category})
          </Typography>
        </CardContent>
        <CardActions>
          <ConfirmationModal
            actionType="Delete"
            entityType="Moto"
            entity={moto}
            requiredScope="can_delete_motos"
            onTrigger={handleMotoDelete}
          />
          {/* <UpdateUserModal user={user} /> */}

          {/* <ScopeButton content="View" requiredScope="can_read_users" onClick={handleViewUser} /> */}
        </CardActions>
      </Card>
    </Grid>
  )
}

export default MotoSearchCard
