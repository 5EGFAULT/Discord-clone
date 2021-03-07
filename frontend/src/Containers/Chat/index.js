import styled from "styled-components";
import hashtag from "../../Icons/hashtag.svg";
import ChatTextFeild from "../../components/ChatTextFeild";
import Message from "../../components/Message";
import avatar from "../../Icons/lol.png";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { selectserver_id } from "../../Features/serverSlice";
import { changeserver_id } from "../../Features/serverSlice";
import defaultimg from "../../Icons/server.svg";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectid } from "../../Features/authSlice";
import { io } from "socket.io-client";
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
  const msgscontainer = useRef(null);
  const [Channelname, setChannelname] = useState("");
  const [Messages, setMessages] = useState([]);
  const user_id = useSelector(selectid);
  let { id } = useParams();
  let socket = io("http://localhost:3003");
  let msgs;
  useEffect(async () => {
    const result = await axios("http://localhost:3003/channel/getall/" + id);
    socket = io("http://localhost:3003");

    setChannelname(result.data.data.channel[0][1]);
    msgs = result.data.data.messages;
    setMessages(result.data.data.messages);
    socket.on("connect", () => {
      console.log("socket", socket);
      socket.emit("join-room", "channel-" + id);
      console.log("room joined", socket);
    });
    socket.on("createmessage", (message) => {
      console.log("message", message);
      console.log("Messages before", msgs);
      msgs.push(message.data[0]);
      console.log("Messages after", msgs);
      setMessages([...msgs]);
    });
    socket.on("disconnect", () => {
      // console.log(socket.connected);
    });
  }, [id]);
  useEffect(() => {
    console.log("*******Messages", Messages);
  }, [Messages]);
  // useEffect(() => {
  //   console.log("socket use effect");
  //   socket.on("connection", () => {});
  //   socket.on("createmessage", (message) => {
  //     console.log("socket use effect inside socket");
  //     // console.log(message.data);
  //     // console.log("data", result.data.data.messages);
  //     let msgs = Messages;
  //     // console.log(Messages);
  //     msgs.push(message.data[0]);
  //     // console.log("msgs", msgs);
  //     // msgscontainer.current.scrollIntoView({
  //     //   behavior: "smooth",
  //     //   block: "end",
  //     // });
  //     console.log("Messages from socket", Messages);
  //     console.log("msgs from socket", msgs);
  //     setMessages(msgs);
  //   });
  //   socket.on("disconnect", () => {
  //     console.log(socket.connected); // false
  //   });
  // }, [id]);
  useEffect(() => {
    if (msgscontainer && msgscontainer.current.lastElementChild)
      msgscontainer.current.lastElementChild.scrollIntoView();
  }, [Messages, msgscontainer]);
  const submitMessageName = (e) => {
    if (e.keyCode == 13) {
      //! send message to backend
      socket.emit("newmessage", {
        text: e.target.value,
        channel_id: id,
        user_id: user_id,
      });
      e.target.value = "";
      // console.log(e.target.value);
    }
  };
  return (
    <Container>
      <ChannelTopTitle>
        <img src={hashtag} />
        {Channelname}
      </ChannelTopTitle>
      <ChatBody ref={msgscontainer}>
        {Messages.map((message, i) =>
          message != null ? (
            <Message
              key={i}
              user={message[0]}
              avatar={
                message[1] != null
                  ? `http://localhost:3003/uploads/users/${message[1]}`
                  : defaultimg
              }
            >
              {message[2]}
            </Message>
          ) : (
            ""
          )
        )}
      </ChatBody>
      <ChatTextFeild submitMessageName={submitMessageName}></ChatTextFeild>
    </Container>
  );
}
export default Chat;
