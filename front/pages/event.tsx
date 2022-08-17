import Wrapper from '../components/Wrapper'
import styled from 'styled-components'
import NavBar from '../components/NavBar'
import Image from 'next/image'
import CcImage from '../pictureAssets/Circuits/Assen.png'
import EventInfo from '../components/EventInfo'

const Header = styled.div`
  height: 5rem;
  margin-top: 3rem;
  text-align: center;
  color: white;
  font-size: 2rem;
  font-weight: bolder;
`
const EventContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 9%;
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

      <EventContainer>
        <Image src={CcImage} width="350px" height="200px" />
        <EventInfo></EventInfo>
      </EventContainer>
    </Wrapper>
  )
}