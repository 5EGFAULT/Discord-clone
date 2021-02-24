import styled from "styled-components";
import {
  AuthForm,
  Headline,
  Link,
  Button,
} from "../../components/AuthComponents/index";
import AuthTextFeild from "../../components/AuthComponents/AuthTextFeild";
import DateSelector from "../../components/AuthComponents/DateSelector";
import { Provider } from "react-redux";
import RegisterStore from "./RegisterStore";
import axios from "axios";
import background from "../../Icons/Background.jpg";

const RegisterForm = styled.div`
  height: 100%;
  width: 416px;
  @media (max-width: 485px) {
    width: 100%;
  }
`;

const Container = styled.div`
  height: 265px;
  width: 100%;
  margin-top: 20px;
`;

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

function Register() {
  // console.log("Initial state: ", store);
  return (
    <Provider store={RegisterStore}>
      <Background>
        <BodyContainer>
          <AuthForm width="416px" height="506px">
            <RegisterForm>
              <Headline>Create an account</Headline>
              <Container>
                <AuthTextFeild
                  name="EMAIL"
                  store={RegisterStore}
                  marginBottom="20px"
                >
                  Email
                </AuthTextFeild>
                <AuthTextFeild
                  name="USERNAME"
                  store={RegisterStore}
                  marginBottom="20px"
                >
                  Username
                </AuthTextFeild>
                <AuthTextFeild
                  name="PASSWORD"
                  store={RegisterStore}
                  type="password"
                  marginBottom="20px"
                >
                  Password
                </AuthTextFeild>
                <DateSelector name="DOB" store={RegisterStore}>
                  Date of birth
                </DateSelector>
                <Button
                  margintop="20px"
                  marginbottom="6px"
                  onClick={RegisterAPI}
                >
                  Register
                  {/* Continue */}
                </Button>

                <Link to="/login">Already have an account?</Link>
              </Container>
            </RegisterForm>
          </AuthForm>
        </BodyContainer>
      </Background>
    </Provider>
  );
}

function RegisterAPI() {
  const username = RegisterStore.getState().username;
  const email = RegisterStore.getState().email;
  const password = RegisterStore.getState().password;
  const date_of_birth2 = new Date(
    Date.parse(
      RegisterStore.getState().dob.month +
        " " +
        RegisterStore.getState().dob.day +
        ", " +
        RegisterStore.getState().dob.year
    )
  );
  const date_of_birth =
    RegisterStore.getState().dob.day +
    "-" +
    RegisterStore.getState().dob.month +
    "-" +
    RegisterStore.getState().dob.year;

  // console.log(username, email, password, date_of_birth);
  let data = JSON.stringify({
    email: email,
    password: password,
    username: username,
    date_of_birth: date_of_birth,
  });

  var config = {
    method: "POST",
    url: "http://localhost:3003/register",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  console.log(data);
  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    email: "dsbsdb",
    password: "fdsfsdf",
    username: "sddbdsbsb",
    date_of_birth: "01-12-2000",
  });
  // var requestOptions = {
  //   method: "POST",
  //   headers: myHeaders,
  //   body: raw,
  //   redirect: "follow",
  // };

  // fetch("https://localhost:3003/register", requestOptions)
  //   .then((response) => response.text())
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log("error", error));
  // console.log(date_of_birth2);
}

export default Register;
