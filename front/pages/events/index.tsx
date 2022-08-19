import { Box, ButtonGroup, Grid, MenuItem, Select } from '@mui/material'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AuthGuard } from '../../components/AuthGuard'
import EventSearchCard from '../../components/cards/EventSearchCard'
import { AddEventModal } from '../../components/modals/AddEventModal'
import { SearchInput } from '../../components/SearchInput'
import Wrapper from '../../components/Wrapper'
import { useGetAllEventsQuery } from '../../lib/api/eventApi'
import { IEvent } from '../../types/events.type'
import { MotoCategory } from '../../types/motos.types'
export const AllEvents = () => {
  const { isLoading, isError, data } = useGetAllEventsQuery()
  const [filterEvent, setFilterEvent] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  useEffect(() => {
    if (isError) {
      toast.error('cant get events')
    }
  }, [isLoading])
  const selectCategories = [
    { id: '', label: 'Rien' },
    ...Object.keys(MotoCategory).map((category) => ({ id: category, label: category }))
  ]

  const onSearchChange = (event) => {
    const { value: val } = event.target
    setFilterEvent(val)
  }
  const onCategoryChange = (event) => {
    const { value: val } = event.target
    setFilterCategory(val)
  }

  const filteredEventByName = (base: IEvent[]) => {
    if (filterEvent === '') {
      return base
    }
    return base.filter((event) => event.name.toLowerCase().startsWith(filterEvent.toLowerCase()))
  }
  const filteredEventByCategory = (base: IEvent[]) => {
    if (filterCategory === '') {
      return base
    }
    return base.filter((event) => event.category === filterCategory)
  }
  const applyAllFilters = () => {
    return filteredEventByCategory(filteredEventByName(data))
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
            <ButtonGroup>
              <SearchInput
                onChange={onSearchChange}
                onSearch={() => setFilterEvent(filterEvent)}
                placeholder="Search Event"
              />
              <Select
                name="category"
                onChange={onCategoryChange}
                variant="filled"
                placeholder="Select Category"
                sx={{ backgroundColor: 'red' }}
              >
                {selectCategories.map((cat) => (
                  <MenuItem value={cat.id}>{cat.label}</MenuItem>
                ))}
              </Select>
            </ButtonGroup>

            <AddEventModal />
            <Grid container spacing={3}>
              {applyAllFilters()?.map((event) => (
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
