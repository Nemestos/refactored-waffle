import dynamic from 'next/dynamic'
import Wrapper from '../components/Wrapper'

const BackgroundImage = dynamic(() => import('../components/Wrapper'), {
  ssr: false
})

// const Wrapper = styled.div`
//   z-index: 1;
//   width: 100%;
//   height: 100%;
//   position: fixed;
//   justify-content: center;
//   align-items: center;
//   display: flex;
// `

export default function WelcomePage() {
  return <Wrapper />
}
