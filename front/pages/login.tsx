import styled from 'styled-components'
import LoginForm from '../components/LoginForm'
import Wrapper from '../components/Wrapper'

// const Wrapper = dynamic(() => import("../components/wrapper"), {
//     ssr: false,
//   });

// const ElemsWrapper = styled.div`
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0;
//   left: 0;
//   justify-content: center;
//   align-items: center;
//   display: flex;
// `;

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
    <>
      <Wrapper>
        <Container id="Conatiner">
          <Content id="Content">
            <LoginForm />
          </Content>
        </Container>
      </Wrapper>
    </>
  )
}
