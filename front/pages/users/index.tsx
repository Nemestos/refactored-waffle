import { Box, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AuthGuard } from '../../components/AuthGuard'
import UserSearchCard from '../../components/cards/UserSearchCard'
import { SearchInput } from '../../components/SearchInput'
import Wrapper from '../../components/Wrapper'
import { useGetAllUsersQuery } from '../../lib/api/userApi'
export const AllUsers = () => {
  const { isLoading, isError, data } = useGetAllUsersQuery()
  const [filterUser, setFilterUser] = useState('')

  useEffect(() => {
    if (isError) {
      toast.error('cant get users')
    }
  }, [isLoading])

  const onSearchChange = (event) => {
    const { value: val } = event.target
    setFilterUser(val)
  }
  const filteredUser = () => {
    if (filterUser === '') {
      return data
    }
    return data.filter((user) => user.firstname.toLowerCase().startsWith(filterUser.toLowerCase()))
  }
  if (isLoading) {
    return (
      <>
        <Wrapper>
          <p>Loading users...</p>
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
              onSearch={() => setFilterUser(filterUser)}
              placeholder="SearchUser"
            />
            <Grid container spacing={3}>
              {filteredUser()?.map((user) => (
                <UserSearchCard user={user} key={user._id} />
              ))}
            </Grid>
          </Box>
        </AuthGuard>
      </Wrapper>
    </>
  )
}

export default AllUsers
