import { Card, CardActions, CardContent, Chip, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDeleteEventMutation } from '../../lib/api/eventApi'
import { IEvent } from '../../types/events.type'
import { ConfirmationModal } from '../modals/ConfirmationModal'
import { UpdateEventModal } from '../modals/UpdateEventModal'

export interface EventSearchCardProps {
  event: IEvent
}
function EventSearchCard({ event }: EventSearchCardProps) {
  const router = useRouter()
  const [deleteEvent, { isError, isSuccess, isLoading }] = useDeleteEventMutation()
  useEffect(() => {
    if (isError) {
      toast.error(`Cant delete event ${event._id}`)
    }
    if (isSuccess) {
      toast.success(`Successful delete ${event._id}`)
    }
  }, [isLoading])

  const handleEventDelete = () => {
    deleteEvent(event._id)
  }
  const handleViewUser = () => {
    router.push(`/events/${event._id}`)
  }
  return (
    <Grid item xs={2}>
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="GrayText" gutterBottom>
            #{event._id}
          </Typography>
          <Typography variant="h5" component="div" color="gray">
            {event.name}
          </Typography>
          <Typography variant="h6" component="div">
            {event.startDate} {'->'} {event.endDate}
          </Typography>

          <Chip label={event.category} />
        </CardContent>
        <CardActions sx={{ display: 'flex', gap: 1 }}>
          <ConfirmationModal
            actionType="Delete"
            entityType="Event"
            entity={event}
            requiredScope="can_delete_events"
            onTrigger={handleEventDelete}
          />
          <UpdateEventModal event={event} />
          
        </CardActions>
      </Card>
    </Grid>
  )
}

export default EventSearchCard
