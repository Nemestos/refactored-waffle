import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SelectElement, TextFieldElement } from 'react-hook-form-mui'
import { toast } from 'react-toastify'
import { mixed, object, string } from 'yup'
import { useUpdateMotoMutation } from '../../lib/api/motoApi'
import { IMoto, IUpdateMotoRequest, MotoCategory } from '../../types/motos.types'
import BaseForm from '../BaseForm'
import { ScopeButton } from '../ScopeButton'

const updateSchema = object({
  manufacturer: string(),
  model: string(),
  category: mixed<MotoCategory>().oneOf(Object.values(MotoCategory))
})

export interface UpdateMotoModalProps {
  moto: IMoto
}

export const UpdateMotoModal = ({ moto }: UpdateMotoModalProps) => {
  const router = useRouter()

  const [updateMoto, { isLoading, isError, isSuccess }] = useUpdateMotoMutation()

  const defaultValues: IUpdateMotoRequest = {
    manufacturer: moto.manufacturer,
    model: moto.model,
    category: moto.category
  }
  const selectCategories = Object.keys(MotoCategory).map((category) => ({ id: category, label: category }))

  useEffect(() => {
    if (isSuccess) {
      toast.success(`La moto ${moto._id} a bien été mis à jour`)
      handleClose()
    }
    if (isError) {
      toast.error('impossible de mettre à jour la moto ', { position: 'top-right' })
    }
  }, [isLoading])

  const onSubmit = (data: IUpdateMotoRequest) => updateMoto({ id: moto._id, moto: data })
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div>
      <ScopeButton content="Update" requiredScope="can_update_motos" onClick={handleOpen} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update moto #{moto._id}</DialogTitle>
        <DialogContent>
          <DialogContentText>Veuillez mettre à jour les champs voulus</DialogContentText>
          <BaseForm
            resolver={yupResolver(updateSchema)}
            defaultValue={defaultValues}
            onSubmit={onSubmit}
            topText="Update Moto"
            buttonText="Submit"
          >
            <TextFieldElement name="manufacturer" label="Manufacturer" />
            <TextFieldElement name="model" label="Model" />
            <SelectElement name="category" label="Category" options={selectCategories} />
          </BaseForm>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
