import NextImage from 'next/image'
import styled from 'styled-components'

export interface BackgroundProps {
  imageSrc: string
}
const Box = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height
  }
}
export function Background({ imageSrc }: BackgroundProps) {
  // const [width, setWidth] = useState<number>()
  // const [height, setheight] = useState<number>()

  // useEffect(() => {
  //   const { width, height } = getWindowDimensions()

  //   setWidth(width)

  //   setheight(height)
  // }, [])

  // useEffect(() => {
  //   function handleResize() {
  //     const { width, height } = getWindowDimensions()

  //     setWidth(width)

  //     setheight(height)
  //   }

  //   window.addEventListener('resize', handleResize)
  //   return () => window.removeEventListener('resize', handleResize)
  // }, [])

  // if (width && height) {
  return <NextImage src={imageSrc} layout="fill" />
  // }
}
export default Background
