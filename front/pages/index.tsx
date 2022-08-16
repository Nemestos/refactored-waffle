import dynamic from 'next/dynamic'
import styled from 'styled-components'
import HomeInfo from '../components/HomeInfo'

const Template = dynamic(() => import('../components/Wrapper'), {
  ssr: false
})

const Wrapper = styled.div`
  z-index: 1;
  width: 100%;
  height: 100%;
  position: fixed;
  justify-content: center;
  align-items: center;
  display: flex;
`

export default function WelcomePage() {
  return (
    <>
      <Template>
        <HomeInfo />
      </Template>
    </>
  )
}
