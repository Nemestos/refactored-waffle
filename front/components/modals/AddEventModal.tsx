import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useEffect, useState } from 'react'
import { DatePickerElement, SelectElement, TextFieldElement } from 'react-hook-form-mui'
import { toast } from 'react-toastify'
import { date, mixed, object, string } from 'yup'
import { useCreateEventMutation, useUpdateEventMutation } from '../../lib/api/eventApi'
import { ICreateEventRequest, IEvent, IUpdateEventRequest } from '../../types/events.type'
import { MotoCategory } from '../../types/motos.types'
import BaseForm from '../BaseForm'
import DateFnsProvider from '../DateFnsProvider'
import { ScopeButton } from '../ScopeButton'

const updateSchema = object({
  name: string().required(),
  category: mixed<MotoCategory>().oneOf(Object.values(MotoCategory)).required(),
  startDate: date().required(),
  endDate: date().required()
})

export const AddEventModal = () => {
  const [createEvent, { isLoading, isError, isSuccess }] = useCreateEventMutation()
  const defaultValues: ICreateEventRequest = {}

  const selectCategories = Object.keys(MotoCategory).map((category) => ({ id: category, label: category }))

  useEffect(() => {
    if (isSuccess) {
      toast.success(`L'event a bien été créer`)
      handleClose()
    }
    if (isError) {
      toast.error('impossible de créer l"event ', { position: 'top-right' })
    }
  }, [isLoading])

  const onSubmit = (data: ICreateEventRequest) => {
    console.log(data)
    createEvent({ event: data })
  }
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div>
      <ScopeButton content="Create" requiredScope="can_create_events" onClick={handleOpen} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create event </DialogTitle>
        <DialogContent>
          <DialogContentText>Veuillez remplir les champs</DialogContentText>
          <BaseForm
            resolver={yupResolver(updateSchema)}
            defaultValue={defaultValues}
            onSubmit={onSubmit}
            topText="Create event"
            buttonText="Submit"
          >
            <TextFieldElement name="name" label="Name" />
            <SelectElement name="category" label="Category" options={selectCategories} />
            <DateFnsProvider>
              <DatePickerElement name="startDate" label="Date début" inputFormat="yyyy-mm-dd" />
            </DateFnsProvider>
            <DateFnsProvider>
              <DatePickerElement name="endDate" label="Date fin" inputFormat="yyyy-mm-dd" />
            </DateFnsProvider>
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
