import styled from "styled-components";
import ListItem from "./ListItem";
import img from "../../../Icons/server.svg";
import img2 from "../../../Icons/img.png";
import lol from "../../../Icons/lol.png";
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
      <ListItem img={img}></ListItem>
      <ListItem img={img2}></ListItem>
      <ListItem img={img}></ListItem>
      <ListItem img={lol}></ListItem>
    </Container>
  );
}
export default Listbar;
