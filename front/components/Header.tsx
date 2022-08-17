import Link from 'next/link'
import { useEffect } from 'react'
import { MdAppRegistration, MdLogin, MdLogout } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { fetchMe, logout } from '../lib/slices/auth'
import { MyThunkDispatch, OurStore } from '../lib/store'
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
  const { loading, me } = useSelector((state: OurStore) => state.authReducer)
  const dispatch: MyThunkDispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => await dispatch(fetchMe())
    fetchUser()
  }, [])

  const handleLogout = async (e) => {
    e.preventDefault()
    console.log('logout')
    await dispatch(logout())
  }
  return (
    <>
      <HeaderStyled>
        <div></div>
        <h3>W M C</h3>
        {me != null ? (
          <div>
            <p>{me.firstname}</p>
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
      {me != null && <NavBar />}
    </>
  )
}
