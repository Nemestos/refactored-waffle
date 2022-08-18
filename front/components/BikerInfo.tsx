import { Typography } from '@mui/material'
import { useEffect } from 'react'
import { AiOutlineClockCircle, AiOutlineCrown, AiOutlineTrophy } from 'react-icons/ai'
import { IoIosPodium } from 'react-icons/io'
import { MdSpeed } from 'react-icons/md'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { useGetUserQuery } from '../lib/api/userApi'
import { RootState, useAppSelector } from '../lib/store'
import { IUser } from '../types/user.types'
import { AuthGuard } from './AuthGuard'
import { UpdateUserModal } from './UpdateUserModal'

const Container = styled.div`
  background-color: #ffffff42;
  width: 1000px;
  height: 550px;
`

const ImgContainer = styled.div`
  clip-path: polygon(0px 0px, 63% 0px, 38% 100%, 0% 100%);
  width: 1250px;
  height: 550px;
  background-color: red;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const GlobalContainer = styled.div`
  width: 650px;
  height: 550px;
  display: flex;
  flex-direction: column;
`
const DownInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
`
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2px;
  margin: 2px;
`
const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 2px;
  margin-top: 15px;
`

const IconContainerLeft = styled.div`
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  padding-left: 25px;
`
const IconContainerRight = styled.div`
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;

  padding-left: 10px;
`
const NumberContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 25px;
`
const FirstNameTitle = styled.h1`
  color: white;
  font-style: italic;
  font-weight: bold;
  font-size: 50px;
  padding: -2px;
  margin: -2px;
`
const LastNameTitle = styled.h1`
  color: white;
  font-style: italic;
  font-weight: bold;
  font-size: 50px;
  padding: -2px;
  margin: -2px;
`
const IconTextBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  padding-top: 40px;
`
const TextsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1px;
  padding-left: 20px;
`
const NumberTimes = styled.h2`
  color: white;
  font-size: 35px;
  font-weight: 400;
  padding-top: 1px;
  margin: 1px;
`
const UnderTitle = styled.h4`
  color: white;
  font-size: 13px;
  font-weight: 400;
  margin: 1px;
`
const NumberTitle = styled.h1`
  color: red;
  background-color: white;
  width: 100px;
  height: 60px;
  font-style: italic;
  font-weight: bold;
  font-size: 50px;
  border-radius: 5px;
  text-align: center;
  padding: -2px;
  margin: -2px;
`
export interface BikerInfoProps {
  id: string
}

function BikerInfo({ id }: BikerInfoProps) {
  const me: IUser = useAppSelector((state: RootState) => state.userState.user)
  const { isLoading, isError, data } = useGetUserQuery(id)
  useEffect(() => {
    if (isError) {
      toast.error(`Cant get profile ${id}`)
    }
  }, [isLoading])

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (isError) {
    return (
      <Typography variant="h3" textAlign="center" color={'whitesmoke'}>
        No profile with id {id}
      </Typography>
    )
  }
  return (
    <AuthGuard customText={"can't get profile"}>
      <Container>
        <ImgContainer id="Container">
          <GlobalContainer id="Global-Container">
            <InfoContainer>
              <NumberContainer>
                <NumberTitle>93</NumberTitle>
              </NumberContainer>
              <ProfileContainer>
                <FirstNameTitle>{data?.firstname}</FirstNameTitle>
                <LastNameTitle>{data?.surname}</LastNameTitle>
              </ProfileContainer>

              <UpdateUserModal user={data} />
            </InfoContainer>
            <DownInfoContainer id="Down-Conatiner">
              <IconContainerLeft>
                <IconTextBox>
                  <AiOutlineTrophy size={70} />
                  <TextsWrapper>
                    <NumberTimes>5</NumberTimes>
                    <UnderTitle>CHAMPIONSHIPS</UnderTitle>
                  </TextsWrapper>
                </IconTextBox>

                <IconTextBox>
                  <AiOutlineClockCircle size={70} />
                  <TextsWrapper>
                    <NumberTimes>68</NumberTimes>
                    <UnderTitle>POLES</UnderTitle>
                  </TextsWrapper>
                </IconTextBox>
                <IconTextBox>
                  <AiOutlineCrown size={70} />
                  <TextsWrapper>
                    <NumberTimes>70</NumberTimes>
                    <UnderTitle>VICTORIES</UnderTitle>
                  </TextsWrapper>
                </IconTextBox>
              </IconContainerLeft>
              <IconContainerRight>
                <IconTextBox>
                  <IoIosPodium size={70} />
                  <TextsWrapper>
                    <NumberTimes>91</NumberTimes>
                    <UnderTitle>PODIUMS</UnderTitle>
                  </TextsWrapper>
                </IconTextBox>
                <IconTextBox>
                  <MdSpeed size={70} />
                  <TextsWrapper>
                    <NumberTimes>44</NumberTimes>
                    <UnderTitle>FASTEST LAP</UnderTitle>
                  </TextsWrapper>
                </IconTextBox>
              </IconContainerRight>
            </DownInfoContainer>
          </GlobalContainer>
        </ImgContainer>
      </Container>
    </AuthGuard>
  )
}

export default BikerInfo
