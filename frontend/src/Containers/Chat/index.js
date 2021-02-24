import styled from "styled-components";
import hashtag from "../../Icons/hashtag.svg";
import ChatTextFeild from "../../components/ChatTextFeild";
import Message from "../../components/Message";
import avatar from "../../Icons/lol.png";
import img from "../../Icons/server.svg";
import img2 from "../../Icons/img.png";
const ChatBody = styled.div`
  flex: 1;
  overflow-y: auto;
`;
const Container = styled.div`
  flex: 1;
  background-color: #37393f;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;
const ChannelTopTitle = styled.div`
  width: 100%;
  height: 48px;
  box-shadow: 0 1px 0 rgba(4, 4, 5, 0.2), 0 1.5px 0 rgba(6, 6, 7, 0.05),
    0 2px 0 rgba(4, 4, 5, 0.05);
  display: flex;
  /* justify-content: center; */
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  font-family: "Whitney Semibold Regular";
  font-size: 16px;
  line-height: 20px;
  color: white;
  padding-bottom: 0px;
  padding-right: 16px;
  padding-top: 0px;
  & img {
    margin: 0 8px;
  }
`;
function Chat() {
  return (
    <Container>
      <ChannelTopTitle>
        <img src={hashtag} />
        channel1
      </ChannelTopTitle>
      <ChatBody>
        <Message avatar={avatar}>Message1</Message>
        <Message avatar={img}>Message2</Message>
        <Message avatar={avatar}>Message3</Message>
        <Message avatar={img2}>Message4</Message>
        <Message avatar={avatar}>Message1</Message>
        <Message avatar={img}>Message2</Message>
        <Message avatar={avatar}>Message3</Message>
        <Message avatar={img2}>Message4</Message>
        <Message avatar={avatar}>Message1</Message>
        <Message avatar={img}>Message2</Message>
        <Message avatar={avatar}>Message3</Message>
        <Message avatar={img2}>Message4</Message>
        <Message avatar={avatar}>Message1</Message>
        <Message avatar={img}>Message2</Message>
        <Message avatar={avatar}>Message3</Message>
        <Message avatar={img2}>Message4</Message>
        <Message avatar={avatar}>Message1</Message>
        <Message avatar={img}>Message2</Message>
        <Message avatar={avatar}>Message3</Message>
        <Message avatar={img2}>Message4</Message>
        <Message avatar={avatar}>Message1</Message>
        <Message avatar={img}>Message2</Message>
        <Message avatar={avatar}>Message3</Message>
        <Message avatar={img2}>Message4</Message>
        <Message avatar={avatar}>Message1</Message>
        <Message avatar={img}>Message2</Message>
        <Message avatar={avatar}>Message3</Message>
        <Message avatar={img2}>Message4</Message>
        <Message avatar={avatar}>Message1</Message>
        <Message avatar={img}>Message2</Message>
        <Message avatar={avatar}>Message3</Message>
        <Message avatar={img2}>Message4</Message>
      </ChatBody>
      <ChatTextFeild></ChatTextFeild>
    </Container>
  );
}
export default Chat;
