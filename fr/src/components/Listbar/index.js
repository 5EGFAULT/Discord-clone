import styled from "styled-components";
import ListItem from "../ListItem";
import ActionServerListitem from "../ActionServerListitem";
import img from "../../Icons/server.svg";
import create from "../../Icons/create.svg";
import search from "../../Icons/search.svg";
import img2 from "../../Icons/img.png";
import lol from "../../Icons/lol.png";
import { selectid } from "../../Features/authSlice";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
const Container = styled.div`
  width: 72px;
  background-color: #202225;
  height: 100vh;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;
  overflow-x: hidden;
`;
function Listbar() {
  const [servers, setservers] = useState([]);
  const user_id = useSelector(selectid);
  useEffect(async () => {
    const result = await axios(
      "http://localhost:3003/server/user-servers/" + user_id
    );
    setservers(result.data.data);
  }, []);
  return (
    <Container>
      {servers.map((server, i) => (
        <ListItem
          key={i}
          id={server[0]}
          servername={server[1]}
          img={`http://localhost:3003/uploads/servers/${server[2]}`}
        ></ListItem>
      ))}

      <ActionServerListitem
        actionname="Create"
        img={create}
      ></ActionServerListitem>
      <ActionServerListitem
        actionname="Join"
        img={search}
      ></ActionServerListitem>
    </Container>
  );
}
export default Listbar;
