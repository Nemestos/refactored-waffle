import { Box } from '@mui/material'
import NextImage from 'next/image'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Header } from './Header'
// const Box = styled.div`
//   display: flex;
//   flex-direction: column;
//   position: static;
//   height: 100%;
//   width: 100%;
//   min-height: 100%;
// `
const Main = styled.main`
  z-index: 1;
  width: 100%;
  height: 100%;
`
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height
  }
}

const Wrapper: React.FunctionComponent<any> = (props) => {
  const [width, setWidth] = useState<number>()
  const [height, setheight] = useState<number>()

  useEffect(() => {
    const { width, height } = getWindowDimensions()

    setWidth(width)

    setheight(height)
  }, [])

  useEffect(() => {
    function handleResize() {
      const { width, height } = getWindowDimensions()

      setWidth(width)

      setheight(height)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (width && height) {
    return (
      <Box display={'flex'} flexDirection={'column'} marginX={5}>
        <Header />
        <NextImage src="/BackGround/background.jpg" layout="fill" className="object-cover w-full h-full" />
        <h3>test</h3>

        <Main>{props.children}</Main>
      </Box>
    )
  }

  return null
}

export default Wrapper
