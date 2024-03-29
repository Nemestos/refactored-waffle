import styled from 'styled-components'

const Box = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`
const Title = styled.h2`
  color: white;
  font-size: 55px;
  font-style: italic;
`

const Info = styled.div`
  color: white;
  font-weight: 100;
  font-size: 18px;
  height: 150px;
  width: 400px;
`

const ButtonInfo = styled.button`
  height: 60px;
  width: 170px;
  font-size: 20px;
  font-weight: bold;
  font-family: sans-serif;
  color: white;
  background-color: red;
  border-radius: 2px;
  border: none;
`

const HomeInfo: React.FunctionComponent = () => (
  <Box>
    <Title>WORLD MOTOCYCLE CHAMPIONSHIP</Title>
    <Info>
      It’s never been easier to create your motocycle racing event for any motocycle categories in few clicks and attemp
      to win the chapionship.
    </Info>
    <ButtonInfo>Let's start</ButtonInfo>
  </Box>
)

export default HomeInfo
