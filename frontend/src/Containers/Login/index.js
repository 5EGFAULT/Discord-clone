import styled from "styled-components";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Loginschema as schema } from "../../yup shema";
import {
  AuthForm,
  Headline,
  SubHeadline,
  Link,
  Button,
  InfoSpan,
} from "../../components/AuthComponents/index";
import AuthTextFeild from "../../components/AuthComponents/AuthTextFeild";
import background from "../../Icons/Background.jpg";
import {
  changeEmail,
  changePassword,
  setisAuthenticated,
  selectisAuthenticated,
  selectEmail,
  selectPassword,
  setUserpic,
  setid,
} from "../../Features/authSlice";
import { useSelector, useDispatch } from "react-redux";
// import { dispatch } from "react-redux";
import store from "../../store";
const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url("${background}");
  overflow-y: scroll;
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
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  const isAuthenticated = useSelector(selectisAuthenticated);

  if (isAuthenticated) {
    return <Redirect to="/" />;
  } else {
    console.log(isAuthenticated);

    return (
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
                  changehandler={(value) => dispatch(changeEmail(value))}
                >
                  Email
                  {/* or Phone Number */}
                </AuthTextFeild>
                <AuthTextFeild
                  type="password"
                  changehandler={(value) => dispatch(changePassword(value))}
                >
                  Password
                </AuthTextFeild>
                <Link to="/reset-password">{/* Forgot your password? */}</Link>
                <Button
                  marginbottom="8px"
                  onClick={() => LoginAPI(email, password)}
                >
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
    );
  }
}
async function LoginAPI(email, password) {
  // TODO Errors showing under inputs in form register
  try {
    const res = await schema.validate(
      { email: email, password: password },
      { abortEarly: false }
    );
    // console.log(res);
    let data = JSON.stringify({
      email: email,
      password: password,
    });
    const config = {
      method: "POST",
      url: "http://localhost:3003/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        let result = response.data;
        console.log(result);

        if (result.err === null) {
          store.dispatch(setid(result.data[0]));
          store.dispatch(setisAuthenticated(true));
          store.dispatch(changePassword("")); //just to clear it from memery
          store.dispatch(setUserpic(result.data[result.data.length - 1]));
        } else {
          //! todo if err from backend
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (err) {
    const errors = [];
    err.inner.forEach((e) =>
      errors.push({
        name: e.path,
        msg: e.message,
      })
    );
    console.log(errors);
  }
}
export default Login;
