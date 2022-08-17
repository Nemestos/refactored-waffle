import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AuthGuard } from '../../components/AuthGuard'
import UserSearchCard from '../../components/UserSearchCard'
import Wrapper from '../../components/Wrapper'
import { fetchUsers } from '../../lib/slices/users'
import { MyThunkDispatch, OurStore } from '../../lib/store'
export const AllUsers = () => {
  const { users } = useSelector((state: OurStore) => state.usersReducer)
  const [filterUser, setFilterUser] = useState('')

  const dispatch: MyThunkDispatch = useDispatch()

  const onSearchChange = (event) => {
    const { value: val } = event.target
    console.log(val)
    setFilterUser(val)
  }
  const filteredUser = () => {
    if (filterUser === '') {
      return users
    }
    return users.filter((user) => user.firstname.toLowerCase().startsWith(filterUser.toLowerCase()))
  }
  useEffect(() => {
    const getUsers = async () => await dispatch(fetchUsers())
    getUsers()
  }, [])
  return (
    <>
      <Wrapper>
        <AuthGuard customText={<p className="text-white">Can't get the users</p>}>
          <div className="flex flex-col gap-4 ">
            <input
              value={filterUser}
              onChange={onSearchChange}
              type={'text'}
              placeholder="Search user"
              className="input input-bordered input-secondary w-full max-w-s"
            />
            <div className="grid gap-2 grid-cols-3">
              {filteredUser()?.map((user, index) => (
                <UserSearchCard user={user} key={user.id} />
              ))}
            </div>
          </div>
        </AuthGuard>
      </Wrapper>
    </>
  )
}

// export const getServerSideProps = user({
//   callback: async (_, store) => {
//     const { dispatch }: { dispatch: MyThunkDispatch } = store
//     await dispatch(fetchUsers())

//     return {
//       props: {
//         users: store.getState().usersReducer.users
//       }
//     }
//   }
// })

export default AllUsers
