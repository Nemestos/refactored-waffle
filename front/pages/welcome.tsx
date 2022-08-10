import styled from "styled-components";
import dynamic from "next/dynamic";
function WelcomePage() {

    const Background = dynamic(() => import("../../components/Background"), {
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
    
    

    return 

    <h1>WORLD MOTOCYCLE CHAMPIONSHIP</h1>

}

export default WelcomePage;