import styled from 'styled-components'

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 550px;
  height: 550px;
  background-color: #ffffff5c;
  color: white;
  border-radius: 10px;
`
const EventTitle = styled.h2`
  color: white;
  font-family: sans-serif;
  padding-left: 30px;
  margin-bottom: 2px;
`
const HorizoneLine = styled.hr`
  width: 40%;
  height: 2px;
  background-color: red;
  border: none;
  margin-inline-start: 25px;
`
function EventInfo() {
  return (
    <InfoContainer>
      <EventTitle>About the event</EventTitle>
      <HorizoneLine />
    </InfoContainer>
  )
}

export default EventInfo
