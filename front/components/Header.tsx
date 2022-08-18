import Link from 'next/link'
import { useEffect } from 'react'
import { MdAppRegistration, MdLogin, MdLogout } from 'react-icons/md'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { useLogoutUserMutation } from '../lib/api/authApi'
import { userApi } from '../lib/api/userApi'

import { RootState, useAppDispatch, useAppSelector } from '../lib/store'
import { IUser } from '../types/user.types'
import NavBar from './NavBar'
const HeaderStyled = styled.header`
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  height: 5rem;
  margin-top: 3rem;
  text-align: center;
  color: white;
  font-size: 2rem;
  font-weight: bolder;
`

const HorizonLine = styled.hr`
  width: 90%;
  height: 2px;
  background-color: white;
  border: none;
  padding-top: -10px;
`

export const Header = () => {
  const user: IUser = useAppSelector((state: RootState) => state.userState.user)
  const dispatch = useAppDispatch()

  const [logoutUser, { isLoading, isSuccess, isError }] = useLogoutUserMutation()

  useEffect(() => {
    if (isSuccess) {
      toast.info('Sucessfull logout', { position: 'top-right' })
      window.location.href = '/login'
    }
    if (isError) {
      toast.error("Can't logout", { position: 'top-right' })
    }
  }, [isLoading])
  useEffect(() => {
    const refreshUser = async () => await dispatch(userApi.endpoints.getMe.initiate(null))
    refreshUser()
  }, [])
  const handleLogout = async (e) => {
    e.preventDefault()
    console.log('logout')
    logoutUser()
  }
  return (
    <>
      <HeaderStyled>
        <div></div>
        <h3>W M C</h3>
        {user != null ? (
          <div>
            <p>{user.firstname}</p>
            <MdLogout onClick={handleLogout} />
          </div>
        ) : (
          <div>
            <Link href="/login">
              <a>
                <MdLogin>login</MdLogin>
              </a>
            </Link>
            <Link href="/signup">
              <a>
                <MdAppRegistration>login</MdAppRegistration>
              </a>
            </Link>
          </div>
        )}
      </HeaderStyled>
      <HorizonLine />
      {user != null && <NavBar />}
    </>
  )
}
