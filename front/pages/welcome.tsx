import styled from 'styled-components'
import HomeInfo from '../components/HomeInfo'
import Wrapper from '../components/Wrapper'
import NextImage from 'next/image'
import MotoImage from '../pictureAssets/BackGround/motoGp.png'

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`

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
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  padding: 70px;

  padding-left: 15%;
`

export default function WelcomePage() {
  return (
    <Wrapper>
      <Container id="Conatiner">
        <Header> W M C </Header>
        <HorizonLine />

        <Content id="Content">
          <HomeInfo />
          <NextImage src={MotoImage} />
        </Content>
      </Container>
    </Wrapper>
  )
}
