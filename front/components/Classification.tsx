import styled from 'styled-components'

const ClassiForm = styled.form`
  width: 580px;
  height: 600px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff0;
`
const ClassiDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  width: 400px;
  height: 80px;
  background-color: white;
  border-radius: 7px;
  margin: 10px;
`
const Title = styled.h2`
  color: white;
  font-family: sans-serif;
  font-weight: 540;
  font-size: 25px;
  padding-left: 30px;
  margin-bottom: 2px;
`
const HorizoneLine = styled.hr`
  width: 50%;
  height: 2px;
  background-color: red;
  border: none;
  margin-inline-start: 25px;
  margin-bottom: 20px;
`
const NumberTitle = styled.h3`
  color: red;
  padding-top: 10px;
`

const NameTitle = styled.h3`
  color: red;
  padding-top: 10px;
`

const CategoryTitle = styled.h3`
  color: gray;
  padding-top: 10px;
`
const TimeTitle = styled.h3`
  color: blue;
  padding-top: 10px;
`

function Classification() {
  return (
    <ClassiForm>
      <Title>Pilots Classification</Title>
      <HorizoneLine />
      <ClassiDiv>
        <NumberTitle>46</NumberTitle>
        <NameTitle>Rossi</NameTitle>
        <CategoryTitle>YMH</CategoryTitle>
        <TimeTitle>10’30.423</TimeTitle>
      </ClassiDiv>
      <ClassiDiv>
        <NumberTitle>46</NumberTitle>
        <NameTitle>Rossi</NameTitle>
        <CategoryTitle>YMH</CategoryTitle>
        <TimeTitle>10’30.423</TimeTitle>
      </ClassiDiv>
      <ClassiDiv>
        <NumberTitle>46</NumberTitle>
        <NameTitle>Rossi</NameTitle>
        <CategoryTitle>YMH</CategoryTitle>
        <TimeTitle>10’30.423</TimeTitle>
      </ClassiDiv>
      <ClassiDiv>
        <NumberTitle>46</NumberTitle>
        <NameTitle>Rossi</NameTitle>
        <CategoryTitle>YMH</CategoryTitle>
        <TimeTitle>10’30.423</TimeTitle>
      </ClassiDiv>
      <ClassiDiv>
        <NumberTitle>46</NumberTitle>
        <NameTitle>Rossi</NameTitle>
        <CategoryTitle>YMH</CategoryTitle>
        <TimeTitle>10’30.423</TimeTitle>
      </ClassiDiv>
    </ClassiForm>
  )
}

export default Classification
