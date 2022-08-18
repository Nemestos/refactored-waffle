import NextImage from 'next/image'
import styled from 'styled-components'

const FormBox = styled.form`
  width: 580px;
  height: 600px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff39;
`
const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  padding-top: 5px;
`
const TopTitle = styled.h3`
  font-family: sans-serif;
  font-weight: 600;
  font-size: 25px;
  color: white;
  padding-left: 30px;
  margin-bottom: 2px;
`
const CircuitTitle = styled.h3`
  font-family: sans-serif;
  color: white;
  font-size: 23px;
  padding-left: 30px;
  margin: 2px;
  text-shadow: 0px 4px 3px #463e3e, 0px 8px 13px #cacaca18, 0px 18px 23px #b9b9b91d;
`
const DateTitle = styled.h3`
  font-family: sans-serif;
  color: white;
  margin: 10px;
  text-shadow: 0px 4px 3px #463e3e, 0px 8px 13px #cacaca18, 0px 18px 23px #b9b9b91d;
`

const ClassTitle = styled.h4`
  font-family: sans-serif;
  color: white;
  margin: 10px;
  text-shadow: 0px 4px 3px #463e3e, 0px 8px 13px #cacaca18, 0px 18px 23px #b9b9b91d;
`

const CircuitImage = styled.div`
  background-color: #000000e8;
  width: 420px;
  height: 380px;
  border-radius: 7px;
  margin: 20px;
  margin-left: 76px;
  display: flex;
  align-items: center;
`
const HorizoneLine = styled.hr`
  width: 30%;
  height: 2px;
  background-color: red;
  border: none;
  margin-inline-start: 25px;
`

function Cards() {
  return (
    <FormBox>
      <TopTitle>Schedules</TopTitle>
      <HorizoneLine />

      <CircuitImage>
        <NextImage src="/Circuits/Assen.png" width="410px" height="350px" />
      </CircuitImage>

      <CircuitTitle>Carole Circuit Championship</CircuitTitle>
      <InfoContainer>
        <ClassTitle>500cc classe II</ClassTitle>
        <DateTitle>28 Mars 2023</DateTitle>
      </InfoContainer>
    </FormBox>
  )
}

export default Cards
