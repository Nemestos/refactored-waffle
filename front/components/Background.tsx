import Image from 'next/image'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

export default BackGround

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height
  }
}

const Box = styled.div`
  position: fixed;
  z-index: 0;
  top: 0;
`
export interface BackGroundProps {
  sourceFile: string
}
function BackGround({ sourceFile }: BackGroundProps) {
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
      <Box>
        <Image src={sourceFile} alt="Picture of bg" width={width} height={height} />
      </Box>
    )
  }

  return null
}
