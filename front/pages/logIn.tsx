import dynamic from 'next/dynamic'
import styled from 'styled-components'
import HomeInfo from '../components/HomeInfo'
import LoginForm from '../components/logInForm'
import Wrapper from '../components/Wrapper'

const Rect = styled.div`
  height: 80px;
  width: 80px;
  background-color: red;
`

const LoginContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 5px;
`

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
  justify-content: space-around;
  padding: 100px;
`

export default function LogInPage() {
  return (
    <Wrapper>
      <Container id="Conatiner">
        <Header> W M C </Header>
        <HorizonLine />

        <Content id="Content">
          <HomeInfo />

          <LoginForm />
        </Content>
      </Container>
    </Wrapper>
  )
}
