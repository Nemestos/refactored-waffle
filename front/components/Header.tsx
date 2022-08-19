import { Box, Button, ButtonGroup, Divider, Typography } from '@mui/material'
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
  height: 5px;
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
    <Box zIndex={1} display="flex" flexDirection={'column'} gap={2} marginX={4} marginY={3}>
      <Box display={'flex'} justifyContent="space-between">
        <div></div>
        <Typography variant="h3" color={'white'}>
          W M C
        </Typography>
        {user != null ? (
          <ButtonGroup orientation="vertical">
            <Typography variant="body1" color={'white'}>
              {user.firstname}
            </Typography>
            <Button>
              <MdLogout onClick={handleLogout} color={'white'} fontSize={'large'} />
            </Button>
          </ButtonGroup>
        ) : (
          <ButtonGroup orientation="vertical">
            <Link href="/login">
              <Button>
                <MdLogin color="white" fontSize={'large'}>
                  login
                </MdLogin>
              </Button>
            </Link>
            <Link href="/signup">
              <Button>
                <MdAppRegistration color="white" fontSize={'large'}>
                  login
                </MdAppRegistration>
              </Button>
            </Link>
          </ButtonGroup>
        )}
      </Box>
      <Divider color="white" style={{ width: '100%' }} />
      {user != null && <NavBar />}
    </Box>
  )
}
