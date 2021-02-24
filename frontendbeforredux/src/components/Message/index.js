import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin-bottom: 8px;
  padding: 8px;
  padding-left: 16px;
  padding-right: 16px;
  /* background-color: red; */
  display: flex;
  color: #fff;
  &:hover {
    background-color: #04040512;
  }
`;
const Avatar = styled.div`
  width: 40px;
  height: 40px;
  background-color: royalblue;
  /* background-color: #36393f; */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  & img {
    max-height: 40px;
    max-width: 40px;
    border-radius: 50%;
  }
`;
const LeftContainer = styled.div`
  width: 100%;
  padding-left: 10px;
`;
const Username = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: default;
  height: 22px;
`;
const MessageBody = styled.div`
  width: 100%;
  padding: 8px;
  /* background-color: red; */
`;
function Message({ children, avatar }) {
  return (
    <Container>
      <Avatar>
        <img src={avatar} />
      </Avatar>
      <LeftContainer>
        <Username>user</Username>
        <MessageBody>{children}</MessageBody>
      </LeftContainer>{" "}
    </Container>
  );
}
export default Message;
