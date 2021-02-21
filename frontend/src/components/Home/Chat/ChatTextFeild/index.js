import styled from "styled-components";

const Container = styled.div`
  height: 44px;
  margin-bottom: 24px;
  width: calc(100% - 48px);
  border-radius: 8px;
  background-color: #40444b;
  margin-left: 16px;
  margin-right: 16px;
  & input {
    height: 100%;
    width: 100%;
    border: none;
    background-color: transparent;
    padding: 11px 16px;
    font-family: "Whitney Book Regular";
    color: #dcddde;
    &:focus {
      outline: none;
    }
  }
`;
function ChatTextFeild() {
  return (
    <Container>
      <input placeholder="Message" />
    </Container>
  );
}
export default ChatTextFeild;
