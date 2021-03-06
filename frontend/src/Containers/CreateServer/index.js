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
import { selectisAuthenticated } from "../../Features/authSlice";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
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

function CreateServer() {
  const [value, setValue] = useState("public");
  const [file, setfile] = useState(null);
  const [servername, setservername] = useState("");
  const handleValueChange = (event) => {
    setValue(event.target.value);
  };
  const handlefileChange = (event) => {
    setfile(event.target.files[0]);
  };
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
            <Headline>Create server</Headline>
            <AuthTextFeild
              width="90%"
              marginBottom="20px"
              type="text"
              changehandler={(value) => setservername(value)}
            >
              Server name
            </AuthTextFeild>
            <FormControl
              component="div"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "90%",
                marginBottom: "20px",
              }}
            >
              <FormLabel
                component="legend"
                style={{
                  color: "white",
                  textTransform: "uppercase",
                  fontFamily: "Whitney Semibold Regular",
                  fontSize: "12px",
                  lineHeight: "16px",
                }}
              >
                Visablity
              </FormLabel>
              <RadioGroup
                aria-label="Visablity"
                name="visablity"
                value={value}
                onChange={handleValueChange}
              >
                <FormControlLabel
                  value="private"
                  style={{
                    color: "white",
                    fontFamily: "Whitney Semibold Regular",
                    fontSize: "12px",
                  }}
                  control={<Radio style={{ color: "white" }} />}
                  label="Private"
                />
                <FormControlLabel
                  style={{
                    color: "white",
                    fontFamily: "Whitney Semibold Regular",
                    fontSize: "12px",
                  }}
                  value="public"
                  control={<Radio style={{ color: "white" }} />}
                  label="Public"
                />
              </RadioGroup>
            </FormControl>
            <InputFile changehandler={handlefileChange} />
            <Button
              onClick={() => CreateServerApi(file, servername, value, history)}
            >
              Create
            </Button>
          </Form>
        </Body>
      </Container>
    );
  }
}

async function CreateServerApi(image, servername, visablity, history) {
  try {
    const res = await schema.validate({ name: servername });
    let formData = new FormData();
    formData.append("image", image);
    formData.append("servername", servername);
    formData.append("visablity", visablity);
    formData.append("creator_id", store.getState().auth.id);
    const config = {
      method: "POST",
      url: "http://localhost:3003/server/create",
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
          history.push("/server/" + result.data.id);
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

  // var formData = new FormData();
  // var imagefile = document.querySelector("#imageserver");
  // formData.append("image", imagefile.files[0]);
  // axios.post("upload_file", formData, {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  // });
  //   uploadFile: function (event) {
  //     const file = event.target.files[0]
  //     axios.post('upload_file', file, {
  //         headers: {
  //           'Content-Type': file.type
  //         }
  //     })
  // }
}

export default CreateServer;
