import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { AuthStates } from '../lib/slices/auth'
import { OurStore } from '../lib/store'

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  height: 5rem;
  margin-top: 3rem;
  text-align: center;
  color: white;
  font-size: 2rem;
  font-weight: bolder;
`

export const Header: React.FC = () => {
  const { loading, me } = useSelector((state: OurStore) => state.authReducer)
  return (
    <HeaderStyled>
      <p>WWC</p>
      {loading == AuthStates.LOADING && 'Loading profile'}
      {me != null ? me.firstname : 'pas connecté'}
    </HeaderStyled>
  )
}
