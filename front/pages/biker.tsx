import Wrapper from '../components/Wrapper'
import styled from 'styled-components'
import NavBar from '../components/NavBar'

const Header = styled.div`
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
  display: flex;
  flex-direction: start;
`

export default function EventPage() {
  return (
    <Wrapper>
      <Header> W M C </Header>
      <HorizonLine />
      <NavBar />
    </Wrapper>
  )
}
