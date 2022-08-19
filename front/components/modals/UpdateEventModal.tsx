import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useEffect, useState } from 'react'
import { DatePickerElement, SelectElement, TextFieldElement } from 'react-hook-form-mui'
import { toast } from 'react-toastify'
import { date, mixed, object, string } from 'yup'
import { useUpdateEventMutation } from '../../lib/api/eventApi'
import { IEvent, IUpdateEventRequest } from '../../types/events.type'
import { MotoCategory } from '../../types/motos.types'
import BaseForm from '../BaseForm'
import DateFnsProvider from '../DateFnsProvider'
import { ScopeButton } from '../ScopeButton'

const updateSchema = object({
  name: string(),
  category: mixed<MotoCategory>().oneOf(Object.values(MotoCategory)),
  startDate: date(),
  endDate: date()
})

export interface UpdateEventModalProps {
  event: IEvent
}

export const UpdateEventModal = ({ event }: UpdateEventModalProps) => {
  // const me: IUser = useAppSelector((state: RootState) => state.userState.user)

  const [updateEvent, { isLoading, isError, isSuccess }] = useUpdateEventMutation()
  const defaultValues: IUpdateEventRequest = {
    name: event.name,
    category: event.category,
    startDate: event.startDate,
    endDate: event.endDate
  }

  const selectCategories = Object.keys(MotoCategory).map((category) => ({ id: category, label: category }))

  useEffect(() => {
    if (isSuccess) {
      toast.success(`L'event ${event._id} a bien été mis à jour`)
      handleClose()
    }
    if (isError) {
      toast.error('impossible de mettre à jour l"event ', { position: 'top-right' })
    }
  }, [isLoading])

  const onSubmit = (data: IUpdateEventRequest) => {
    console.log(data)
    updateEvent({ id: event._id, event: data })
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
      <ScopeButton content="Update" requiredScope="can_update_events" onClick={handleOpen} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update event #{event._id}</DialogTitle>
        <DialogContent>
          <DialogContentText>Veuillez mettre à jour les champs voulus</DialogContentText>
          <BaseForm
            resolver={yupResolver(updateSchema)}
            defaultValue={defaultValues}
            onSubmit={onSubmit}
            topText="Update event"
            buttonText="Submit"
          >
            <TextFieldElement name="name" label="Name" />
            <SelectElement name="category" label="Category" options={selectCategories} />
            <DateFnsProvider>
              <DatePickerElement
                name="startDate"
                label="Date début"
                // onChange={(date) => moment(date).format('YYYY-MM-DD')}
              />
            </DateFnsProvider>
            <DateFnsProvider>
              <DatePickerElement
                name="endDate"
                label="Date fin"
                // onChange={(date) => moment(date).format('YYYY-MM-DD')}
              />
            </DateFnsProvider>
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
