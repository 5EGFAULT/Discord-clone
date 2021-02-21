import styled from "styled-components";

const Label = styled.div`
  text-transform: uppercase;
  text-align: left;
  margin-bottom: 8px;
  font-family: "Whitney Semibold Regular";
  font-size: 12px;
  line-height: 16px;
  cursor: default;
  color: #8e9297;
`;
const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  height: 40px;
  padding: 10px;
  font-family: "Whitney Book Regular";
  font-size: 16px;
  line-height: normal;
  border-radius: 3px;
  letter-spacing: normal;
  color: #dcddde;
  background-color: transparent;
  border: none;
  &:focus {
    outline: none;
    border: 1px solid #7289da;
  }
`;
const InputWrap = styled.div`
  background-color: #0000001a;
  border: 1px solid #0000004d;
  border-radius: 3px;
  transition: border-color 0.2s ease-in-out;
  &:hover {
    border-color: #040405;
  }
`;
function AuthTextFeild(props) {
  return (
    <div style={{ marginBottom: props.marginBottom }}>
      <Label>{props.children}</Label>
      <InputWrap>
        <Input
          onChange={(e) => {
            props.store.dispatch({
              type: "CHANGE_" + props.name,
              payload: e.target.value,
            });
          }}
          type={props.type}
        ></Input>
      </InputWrap>
    </div>
  );
}
export default AuthTextFeild;
