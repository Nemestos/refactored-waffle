import styled from 'styled-components'

const Form = styled.form`
  width: 495px;
  height: 395px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff39;
`

const TitleHello = styled.h2`
  color: white;
  padding-right: 10px;
  font-weight: bold;
  font-family: sans-serif;
`

const TitleBiker = styled.h2`
  color: red;
  font-weight: bold;
  font-family: sans-serif;
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 20px;
`
const InputLoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const InputLogin = styled.input`
  font-size: 20px;
  padding: 10px;
  margin: auto;
  border-radius: 8px;
  border: none;
  background-color: white;
`

const Button = styled.button`
  border-radius: 8px;
  padding: 20px;
  font-size: 30px;
  font-weight: bold;
  font-family: sans-serif;
  color: red;
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  text-shadow: 0px 4px 3px #463e3e, 0px 8px 13px #cacaca18, 0px 18px 23px #b9b9b91d;
`

function LoginForm() {
  return (
    <Form>
      <TitleWrapper>
        <TitleHello> Welcome Back </TitleHello> <TitleBiker> Biker</TitleBiker>
      </TitleWrapper>

      <InputLoginWrapper>
        <h4>Username</h4>
        <InputLogin placeholder="username" type="email" />
      </InputLoginWrapper>
      <br />
      <InputLoginWrapper>
        <h4>Password</h4>
        <InputLogin placeholder="password" type="password" />
      </InputLoginWrapper>
      <Button>Log In</Button>
    </Form>
  )
}

export default LoginForm
