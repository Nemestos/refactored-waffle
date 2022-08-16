import Link from 'next/link'
import { MdAppRegistration, MdLogin } from 'react-icons/md'
import styled from 'styled-components'
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

export const Header: React.FC = () => {
  //   const { loading, me } = useSelector((state: OurStore) => state.authReducer)
  return (
    <>
      <HeaderStyled>
        <div></div>
        <h3>W M C</h3>
        <div>
          <Link href="/login">
            <MdLogin>login</MdLogin>
          </Link>
          <Link href="/signup">
            <MdAppRegistration>login</MdAppRegistration>
          </Link>
        </div>
        {/* {loading === AuthStates.LOADING && 'Loading profile'}
      {me != null ? me.firstname : 'pas connecté'} */}
      </HeaderStyled>
      <HorizonLine />
    </>
  )
}
