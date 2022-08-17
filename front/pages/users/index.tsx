import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AuthGuard } from '../../components/AuthGuard'
import Wrapper from '../../components/Wrapper'
import { fetchUsers } from '../../lib/slices/users'
import { MyThunkDispatch, OurStore } from '../../lib/store'
export const AllUsers = () => {
  const { loading, users, error } = useSelector((state: OurStore) => state.usersReducer)
  const dispatch: MyThunkDispatch = useDispatch()
  useEffect(() => {
    const getUsers = async () => await dispatch(fetchUsers())
    getUsers()
  }, [])
  return (
    <>
      <Wrapper>
        <AuthGuard customText={<p className="text-white">Can't get the users</p>}>
          {users?.map((user, index) => (
            <div key={index}>
              <p className="text-white">{user.email}</p>
            </div>
          ))}
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
