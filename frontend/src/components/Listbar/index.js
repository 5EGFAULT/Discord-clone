import styled from "styled-components";
import ListItem from "../ListItem";
import img from "../../Icons/server.svg";
import img2 from "../../Icons/img.png";
import lol from "../../Icons/lol.png";
import { Link } from "react-router-dom";
const Container = styled.div`
  width: 72px;
  background-color: #202225;
  height: 100vh;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
function Listbar() {
  return (
    <Container>
      <ListItem id="1" servername={"server1"} img={img}></ListItem>
      <ListItem id="2" servername={"server2"} img={img2}></ListItem>
      <ListItem id="3" servername={"server3"} img={img}></ListItem>
      <ListItem id="4" servername={"server4"} img={lol}></ListItem>
    </Container>
  );
}
export default Listbar;
