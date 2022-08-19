import { ButtonGroup, Grid, MenuItem, Select } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AuthGuard } from '../../../components/AuthGuard'
import MotoSearchCard from '../../../components/cards/MotoSearchCard'
import { SearchInput } from '../../../components/SearchInput'
import Wrapper from '../../../components/Wrapper'
import { useGetAllUserMotosQuery } from '../../../lib/api/motoApi'
import { IEvent } from '../../../types/events.type'
import { IMoto, MotoCategory } from '../../../types/motos.types'

export const AllUsersMotos = () => {
  const router = useRouter()

  const { id } = router.query
  const [filterMoto, setFilterMoto] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const getUserMotosState = useGetAllUserMotosQuery(id as string)

  useEffect(() => {
    if (getUserMotosState.isError) {
      toast.error(`Cant get motos of user ${id}`)
    }
  }, [getUserMotosState.isLoading])

  const selectCategories = [
    { id: '', label: 'Rien' },
    ...Object.keys(MotoCategory).map((category) => ({ id: category, label: category }))
  ]

  const onSearchChange = (event) => {
    const { value: val } = event.target
    setFilterMoto(val)
  }
  const onCategoryChange = (event) => {
    const { value: val } = event.target
    setFilterCategory(val)
  }

  const filteredMotoByName = (base: IMoto[]) => {
    if (filterMoto === '') {
      return base
    }
    return base.filter((moto) => moto.model.toLowerCase().startsWith(filterMoto.toLowerCase()))
  }
  const filteredMotoByCategory = (base: IMoto[]) => {
    if (filterCategory === '') {
      return base
    }
    return base.filter((moto) => moto.category === filterCategory)
  }
  const applyAllFilters = () => {
    return filteredMotoByName(filteredMotoByCategory(getUserMotosState.data))
  }

  if (getUserMotosState.isLoading) {
    return (
      <>
        <Wrapper>
          <p>Loading motos...</p>
        </Wrapper>
      </>
    )
  }
  return (
    <>
      <Wrapper>
        <AuthGuard customText={'Can get users'}>
          <Box display={'flex'} flexDirection="column" gap={3} justifyContent={'center'} alignItems="center">
            <ButtonGroup>
              <SearchInput
                onChange={onSearchChange}
                onSearch={() => setFilterMoto(filterMoto)}
                placeholder="SearchMotos"
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

            <Grid container spacing={3}>
              {applyAllFilters()?.map((moto) => (
                <MotoSearchCard moto={moto} userId={id as string} key={moto._id} />
              ))}
            </Grid>
          </Box>
        </AuthGuard>
      </Wrapper>
    </>
  )
}

export default AllUsersMotos
