import styled from "styled-components";
import axios from "axios";
import * as yup from "yup";
// import passwordyup from "yup-password";
// passwordyup(yup);
// console.log(passwordyup);
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
  selectEmail,
  selectPassword,
} from "../../Features/loginSlice";
import { useSelector, useDispatch } from "react-redux";

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
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
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
let schema = yup.object().shape({
  email: yup.string().email().required("No email provided."),
  password: yup
    .string()
    .required("No password provided.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_-])[A-Za-z\d@$!%*#?&_-]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});
async function LoginAPI(email, password) {
  try {
    const res = await schema.validate(
      { email: email, password: password },
      { abortEarly: false }
    );
    console.log(res);
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
        console.log(JSON.stringify(response.data));
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
