import Image from 'next/image'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import backgroundImage from '../../pictureAssets/BackGround/background.jpg'

const Box = styled.div`
  position: fixed;
  top: 0;
`;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const BackgroundImage: React.PropsWithChildren = (props) => {
  const [width, setWidth] = useState<number>();
  const [height, setheight] = useState<number>();

  useEffect(() => {
    const { width, height } = getWindowDimensions();

    setWidth(width);

    setheight(height);
  }, []);

  useEffect(() => {
    function handleResize() {
      const { width, height } = getWindowDimensions();

      setWidth(width);

      setheight(height);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (width && height) {
    return (
      <Box id="background">
        <Image
          src={backgroundImage}
          width={width}
          height={height}
        />
        { props.children}
      </Box>
    );
  }

  return null;
}

export default BackgroundImage;
