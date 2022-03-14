import styled from "styled-components";
import Listbar from "../../components/Listbar";
import InputFile from "../../components/InputFile";
import { useState } from "react";
import AuthTextFeild from "../../components/AuthComponents/AuthTextFeild";
import Radio from "@material-ui/core/Radio";
import axios from "axios";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { nameschema as schema } from "../../yup shema";
import { Button, Headline } from "../../components/AuthComponents";
import store from "../../store";
import {
  changeUsername,
  selectisAuthenticated,
  selectUsername,
  setUserpic,
} from "../../Features/authSlice";
import { changeserver_id } from "../../Features/serverSlice";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { setErrors, selectErrors } from "../../Features/errorsSlice";
import Error from "../../components/Errors";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-wrap: nowrap;
`;
const Body = styled.div`
  flex: 1;
  background-color: #37393f;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.div`
  max-width: 100%;
  max-height: 100%;
  width: 500px;
  height: 500px;
  background-color: #20222587;
  padding: 32px;
  border-radius: 5px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  color: white;
  font-family: "Whitney Semibold Regular";
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

function EditUser() {
  const [file, setfile] = useState(null);
  const [username, setusername] = useState("");
  const oldusername = useSelector(selectUsername);

  const handlefileChange = (event) => {
    setfile(event.target.files[0]);
  };
  const errors = useSelector(selectErrors);

  const isAuthenticated = useSelector(selectisAuthenticated);
  let history = useHistory();
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  } else {
    return (
      <Container>
        <Listbar></Listbar>
        <Body>
          <Form>
            <Headline>Edit Profile</Headline>
            <AuthTextFeild
              placeholder={oldusername}
              width="90%"
              marginBottom="20px"
              type="text"
              changehandler={(value) => setusername(value)}
            >
              User name
            </AuthTextFeild>
            <InputFile name="User image" changehandler={handlefileChange} />
            <Button onClick={() => EditApi(file, username, history)}>
              Edit
            </Button>
            <div>
              {errors == null
                ? ""
                : errors.map((error, i) => <Error key={i}>{error.msg}</Error>)}
            </div>
          </Form>
        </Body>
      </Container>
    );
  }
}

async function EditApi(image, username, history) {
  try {
    const res = await schema.validate({ name: username });
    let formData = new FormData();
    formData.append("image", image);
    formData.append("username", username);
    formData.append("user_id", store.getState().auth.id);
    const config = {
      method: "POST",
      url: "http://localhost:3003/user/edit",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };
    axios(config)
      .then(function (response) {
        let result = response.data;
        console.log(result);

        if (result.err === null) {
          console.log(result.data.users_pic);
          store.dispatch(setUserpic(result.data.users_pic));
          store.dispatch(changeUsername(username));
          store.dispatch(setErrors(null));
          history.push("/");
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
    if (errors.length == 0) {
      errors.push({ msg: err.message });
      store.dispatch(setErrors(errors));
    }
    console.log([{ msg: err.message }]);
  }
}

export default EditUser;
