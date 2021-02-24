import styled from "styled-components";
import {
  AuthForm,
  Headline,
  SubHeadline,
  Link,
  Button,
  InfoSpan,
} from "../../components/AuthComponents/index";
import AuthTextFeild from "../../components/AuthComponents/AuthTextFeild";
import { Provider } from "react-redux";
import LoginStore from "./LoginStore";
import background from "../../Icons/Background.jpg";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url("${background}");
`;
const BodyContainer = styled.div`
  width: 100vw;
  max-width: 1480px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
`;

const LoginForm = styled.div`
  height: 100%;
  width: 414px;
  @media (max-width: 485px) {
    width: 100%;
  }
`;
const QrDiv = styled.div`
  height: 100%;
  width: 240px;
  /* background-color: red; */
  @media (max-width: 830px) {
    display: none;
  }
`;
const Separateur = styled.div`
  margin: 0 32px;
  @media (max-width: 830px) {
    display: none;
  }
`;
const Container = styled.div`
  height: 265px;
  width: 100%;
  margin-top: 20px;
`;

function Login() {
  return (
    <Provider store={LoginStore}>
      <Background>
        <BodyContainer>
          <AuthForm width="720px" height="344px">
            <LoginForm>
              <Headline>Welcome back!</Headline>
              <SubHeadline>We're so excited to see you again!</SubHeadline>
              <Container>
                <AuthTextFeild
                  marginBottom="20px"
                  type="text"
                  // type="email"
                  name="EMAIL"
                  store={LoginStore}
                >
                  Email
                  {/* or Phone Number */}
                </AuthTextFeild>
                <AuthTextFeild
                  type="password"
                  name="PASSWORD"
                  store={LoginStore}
                >
                  Password
                </AuthTextFeild>
                <Link to="/reset-password">Forgot your password?</Link>
                <Button marginbottom="8px" onClick={LoginAPI}>
                  Login
                </Button>
                <InfoSpan>
                  Need an account? <Link to="/register"> Register</Link>
                </InfoSpan>
              </Container>
            </LoginForm>
            <Separateur />
            <QrDiv></QrDiv>
          </AuthForm>
        </BodyContainer>
      </Background>
    </Provider>
  );
}
function LoginAPI() {
  const email = LoginStore.getState().email;
  const password = LoginStore.getState().password;

  console.log(email, password);
}
export default Login;
