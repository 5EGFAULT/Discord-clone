import styled from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Listbar from "../../components/Listbar";
import Sidebar from "../../components/Sidebar";
import Chat from "../Chat";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-wrap: nowrap;
`;

function ChannelRoom() {
  return (
    <Container>
      <Listbar></Listbar>
      <Sidebar server_name="Server Title"></Sidebar>
      <Chat></Chat>
    </Container>
  );
}

export default ChannelRoom;
