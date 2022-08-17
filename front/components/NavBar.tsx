import Link from 'next/link'
import styled from 'styled-components'

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
  return (
    <NavContainer>
      <NavUl>
        <li>
          <Link href="/home">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Events</a>
          </Link>
        </li>
        <li>
          <Link href="/users">
            <a>Users</a>
          </Link>
        </li>

        <li>
          <Link href="/">
            <a>Biker</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Contact</a>
          </Link>
        </li>
      </NavUl>
    </NavContainer>
  )
}

export default NavBar
