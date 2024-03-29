import dynamic from 'next/dynamic'
import styled from 'styled-components'
import SignupForm from '../components/forms/SignUpForm'
const Template = dynamic(() => import('../components/Wrapper'), {
  ssr: false
})

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
  padding-top: 50px;
  padding-left: 100px;
  padding-right: 100px;
`

export default function LogInPage() {
  return (
    <>
      <Template>
        <Container id="Conatiner">
          <Content id="Content">
            <SignupForm />
          </Content>
        </Container>
      </Template>
    </>
  )
}
