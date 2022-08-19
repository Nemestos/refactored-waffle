import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AuthGuard } from '../../../components/AuthGuard'
import MotoSearchCard from '../../../components/cards/MotoSearchCard'
import { SearchInput } from '../../../components/SearchInput'
import Wrapper from '../../../components/Wrapper'
import { useGetAllUserMotosQuery } from '../../../lib/api/motoApi'

export const AllUsersMotos = () => {
  const router = useRouter()

  const { id } = router.query

  const getUserMotosState = useGetAllUserMotosQuery(id as string)

  useEffect(() => {
    if (getUserMotosState.isError) {
      toast.error(`Cant get motos of user ${id}`)
    }
  }, [getUserMotosState.isLoading])
  const [filterMoto, setFilterMoto] = useState('')

  const onSearchChange = (event) => {
    const { value: val } = event.target
    setFilterMoto(val)
  }
  const filteredMoto = () => {
    if (filterMoto === '') {
      return getUserMotosState.data
    }
    return getUserMotosState.data.filter((moto) => moto.model.toLowerCase().startsWith(filterMoto.toLowerCase()))
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
            <SearchInput
              onChange={onSearchChange}
              onSearch={() => setFilterMoto(filterMoto)}
              placeholder="SearchMotos"
            />
            <Grid container spacing={3}>
              {filteredMoto()?.map((moto) => (
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
