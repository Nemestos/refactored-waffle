import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import UserSearchCard from '../../components/UserSearchCard'
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
        <div className="flex flex-col gap-4 ">
          <input
            value={filterUser}
            onChange={onSearchChange}
            type={'text'}
            placeholder="Search user"
            className="input input-bordered input-secondary w-full max-w-s"
          />
          <div className="grid gap-2 grid-cols-3">
            {filteredUser()?.map((user) => (
              <UserSearchCard user={user} key={user.id} />
            ))}
          </div>
        </div>
      </Wrapper>
    </>
  )
}

export default AllUsers
