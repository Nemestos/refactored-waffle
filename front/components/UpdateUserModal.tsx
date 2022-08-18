import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { object, string } from 'yup'
import { useUpdateUserMutation } from '../lib/api/userApi'
import { RootState, useAppSelector } from '../lib/store'
import { IUpdateUserRequest, IUser } from '../types/user.types'
import BaseForm from './BaseForm'
import BaseInput from './BaseInput'
import { ScopeButton } from './ScopeButton'

const updateSchema = object({
  email: string().email(),
  firstname: string(),
  surname: string()
})

export interface UpdateUserModalProps {
  user: IUser
}

export const UpdateUserModal = ({ user }: UpdateUserModalProps) => {
  const router = useRouter()
  const me: IUser = useAppSelector((state: RootState) => state.userState.user)

  const [updateUser, { isLoading, isError, isSuccess }] = useUpdateUserMutation()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUpdateUserRequest>({
    defaultValues: {
      email: user.email,
      firstname: user.firstname,
      surname: user.surname
    },
    resolver: yupResolver(updateSchema)
  })

  useEffect(() => {
    if (isSuccess) {
      toast.success(`L'utilisateur ${user._id} a bien été mis à jour`)
      handleClose()
    }
    if (isError) {
      toast.error('impossible de mettre à jour l"utilisateur ', { position: 'top-right' })
    }
  }, [isLoading])

  const onSubmit = (data: IUpdateUserRequest) => updateUser({ id: user._id, user: data })
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div>
      {me._id === user._id ? (
        <Button onClick={handleOpen} size="small" variant="contained">
          Update
        </Button>
      ) : (
        <ScopeButton content="Update" requiredScope="can_update_users" onClick={handleOpen} />
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update user #{user._id}</DialogTitle>
        <DialogContent>
          <DialogContentText>Veuillez mettre à jour les champs voulus</DialogContentText>
          <BaseForm onSubmit={handleSubmit(onSubmit)} topText="Update user" buttonText="Submit">
            <BaseInput name="email" register={register} errors={errors} label="Email" />
            <BaseInput name="firstname" register={register} errors={errors} label="Firstname" />
            <BaseInput name="surname" register={register} errors={errors} label="Surname" />
          </BaseForm>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="info">
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
