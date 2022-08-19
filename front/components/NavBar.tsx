import Link from 'next/link'
import styled from 'styled-components'
import { RootState, useAppSelector } from '../lib/store'
import { IUser } from '../types/user.types'

const NavContainer = styled.nav`
  z-index: 1;

  display: flex;
  color: white;
`

const NavUl = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  padding: 25%;
  padding-top: 1px;
  padding-bottom: 20px;
  font-size: 20px;
  font-family: sans-serif;
  font-weight: 500;
`

function NavBar() {
  const me: IUser = useAppSelector((state: RootState) => state.userState.user)

  return (
    <NavContainer>
      <NavUl>
        <li>
          <Link href="/home">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/events">
            <a>Events</a>
          </Link>
        </li>
        <li>
          <Link href="/users">
            <a>Users</a>
          </Link>
        </li>

        <li>
          <Link href={{ pathname: `/users/${me._id}` }}>
            <a>Biker</a>
          </Link>
        </li>
      </NavUl>
    </NavContainer>
  )
}

export default NavBar
