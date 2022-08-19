import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useEffect, useState } from 'react'
import { TextFieldElement } from 'react-hook-form-mui'
import { toast } from 'react-toastify'
import { object, string } from 'yup'
import { useUpdateUserMutation } from '../../lib/api/userApi'
import { RootState, useAppSelector } from '../../lib/store'
import { IUpdateUserRequest, IUser } from '../../types/user.types'
import BaseForm from '../BaseForm'
import { ScopeButton } from '../ScopeButton'

const updateSchema = object({
  email: string().email(),
  firstname: string(),
  surname: string()
})

export interface UpdateUserModalProps {
  user: IUser
}

export const UpdateUserModal = ({ user }: UpdateUserModalProps) => {
  const me: IUser = useAppSelector((state: RootState) => state.userState.user)

  const [updateUser, { isLoading, isError, isSuccess }] = useUpdateUserMutation()
  const defaultValues: IUpdateUserRequest = {
    email: user.email,
    firstname: user.firstname,
    surname: user.surname
  }

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
        <Button onClick={handleOpen} size="small" variant="contained" color="error">
          Update
        </Button>
      ) : (
        <ScopeButton content="Update" requiredScope="can_update_users" onClick={handleOpen} />
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update user #{user._id}</DialogTitle>
        <DialogContent>
          <DialogContentText>Veuillez mettre à jour les champs voulus</DialogContentText>
          <BaseForm
            resolver={yupResolver(updateSchema)}
            defaultValue={defaultValues}
            onSubmit={onSubmit}
            topText="Update user"
            buttonText="Submit"
          >
            <TextFieldElement name="email" label="Email" />
            <TextFieldElement name="firstname" label="Firstname" />
            <TextFieldElement name="surname" label="Surname" />
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
