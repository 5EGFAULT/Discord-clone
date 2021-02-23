import styled from "styled-components";
import Login from "./Login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import background from "../../Icons/Background.jpg";
import Register from "./Register";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url("${background}");
`;
const Container = styled.div`
  width: 100vw;
  max-width: 1480px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
`;

function Auth() {
  return (
    <Background>
      <Container>
        <Router></Router>
      </Container>
    </Background>
  );
}

export default Auth;
