import { Button, capitalize, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useState } from 'react'
import { IEntity } from '../../types/global.types'
import { ScopeButton } from '../ScopeButton'
export interface ConfirmationModalProps<T> {
  entity: T
  entityType: string
  actionType: string
  requiredScope: string
  onTrigger: () => void
  children?: React.ReactNode
}

export const ConfirmationModal = <T extends IEntity>({
  entity,
  entityType,
  actionType,
  requiredScope,
  onTrigger,
  children
}: ConfirmationModalProps<T>) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleAction = () => {
    onTrigger()
    handleClose()
  }
  return (
    <div>
      <ScopeButton content={actionType} requiredScope={requiredScope} onClick={handleOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Are you sure to {actionType} {entityType} with id {entity._id}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {actionType} un.e {entityType} est irreversible
          </DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="info">
            Annuler
          </Button>
          <Button onClick={handleAction} color="error">
            {capitalize(actionType)}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
