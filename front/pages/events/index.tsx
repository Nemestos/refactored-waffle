import { Box, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AuthGuard } from '../../components/AuthGuard'
import EventSearchCard from '../../components/cards/EventSearchCard'
import { AddEventModal } from '../../components/modals/AddEventModal'
import { ScopeButton } from '../../components/ScopeButton'
import { SearchInput } from '../../components/SearchInput'
import Wrapper from '../../components/Wrapper'
import { useGetAllEventsQuery } from '../../lib/api/eventApi'
export const AllEvents = () => {
  const { isLoading, isError, data } = useGetAllEventsQuery()
  const [filterEvent, setFilterEvent] = useState('')

  useEffect(() => {
    if (isError) {
      toast.error('cant get events')
    }
  }, [isLoading])

  const onSearchChange = (event) => {
    const { value: val } = event.target
    setFilterEvent(val)
  }
  const filteredEvent = () => {
    if (filterEvent === '') {
      return data
    }
    return data.filter((event) => event.name.toLowerCase().startsWith(filterEvent.toLowerCase()))
  }
  if (isLoading) {
    return (
      <>
        <Wrapper>
          <p>Loading events...</p>
        </Wrapper>
      </>
    )
  }
  return (
    <>
      <Wrapper>
        <AuthGuard customText={'Can get events'}>
          <Box display={'flex'} flexDirection="column" gap={3} justifyContent={'center'} alignItems="center">
            <SearchInput
              onChange={onSearchChange}
              onSearch={() => setFilterEvent(filterEvent)}
              placeholder="Search Event"
            />
            <AddEventModal />
            <Grid container spacing={3}>
              {filteredEvent()?.map((event) => (
                <EventSearchCard event={event} key={event._id} />
              ))}
            </Grid>
          </Box>
        </AuthGuard>
      </Wrapper>
    </>
  )
}

export default AllEvents
