import Wrapper from '../components/Wrapper'
import styled from 'styled-components'
import NavBar from '../components/NavBar'
import BikerInfo from '../components/BikerInfo'
import { copyFileSync } from 'fs'

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
const BikerInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 50px;
`

export default function EventPage() {
  return (
    <Wrapper>
      <Header> W M C </Header>
      <HorizonLine />
      <NavBar />
      <BikerInfoWrapper>
        <BikerInfo />
      </BikerInfoWrapper>
    </Wrapper>
  )
}
