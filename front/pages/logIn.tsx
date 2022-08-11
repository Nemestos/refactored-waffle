import dynamic from "next/dynamic"
import styled from "styled-components"
import Form from "../components/logInForm";

const Wrapper = dynamic(() => import("../components/backgroundImage"), {
    ssr: false,
  });
  
  // const Wrapper = styled.div`
  //   width: 100%;
  //   height: 100%;
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   justify-content: center;
  //   align-items: center;
  //   display: flex;
  // `;

  const Rect = styled.div`
    height: 80px;
    width: 80px;
    background-color:red;
  `;

  const LoginContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    hight: 70vh;
    width: 30vw;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 5px;
    `;

export default function LogInPage() {
    return(
      <Wrapper id="wrapper">
    
    <p>Hello</p>
      
      {/* <LoginContainer id="login">
      <Form />

      </LoginContainer> */}

      </Wrapper>
  );
}