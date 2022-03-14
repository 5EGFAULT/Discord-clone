import styled from "styled-components";
import upload from "../../Icons/upload.svg";
const Input = styled.input`
  display: none;
`;
const Span = styled.div`
  width: 100%;
  color: white;
  text-transform: uppercase;
  font-family: "Whitney Semibold Regular";
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
`;
function InputFile({ changehandler, name }) {
  return (
    <label style={{ width: "90%", marginBottom: "20px" }}>
      <Span>
        <img src={upload} style={{ marginRight: "8px" }} /> {name}
      </Span>

      <Input
        onChange={(e) => changehandler(e)}
        accept="image/*"
        id="imageserver"
        type="file"
      />
    </label>
  );
}

export default InputFile;
