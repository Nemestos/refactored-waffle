import { useRouter } from 'next/router'
import styled from 'styled-components'
import BikerInfo from '../../../components/BikerInfo'
import Wrapper from '../../../components/Wrapper'

const BikerInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 50px;
`

export const Profile = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <Wrapper>
      <BikerInfoWrapper>
        <BikerInfo id={id as string} />
      </BikerInfoWrapper>
    </Wrapper>
  )
}

export default Profile
