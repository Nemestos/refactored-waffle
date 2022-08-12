import Image from 'next/image'
import { ComponentProps, PropsWithChildren, useEffect, useState } from 'react'
import styled from 'styled-components'
import backgroundImage from '../../pictureAssets/BackGround/background.jpg'

const Box = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const Wrapper: React.FunctionComponent<any> = (props) => {

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
      <Box id="wrapper">
        <Image
          className="background"
          id="background-image"
          src={backgroundImage}
          width={width}
          height={height}
          layout="fill"
          style={{zIndex: -1}}
        />
        {props.children}
      </Box>
    );
  }

  return null;
}

export default Wrapper;