import dynamic from "next/dynamic"
import styled from "styled-components"
import Form from "../components/logInForm";

const BackgroundImage = dynamic(() => import("../components/Wrapper"), {
    ssr: false,
  });
  
  const Wrapper = styled.div`
    z-index: 1;
    width: 100%;
    height: 100%;
    position: fixed;
    justify-content: center;
    align-items: center;
    display: flex;
  `;

  const Input = styled.div`
    background-colo
  `
  

export default function WelcomePage() {
    return(
    <>
      <Wrapper>
        <Form />
      </Wrapper>

      <BackgroundImage />
      
    </>
  );
}