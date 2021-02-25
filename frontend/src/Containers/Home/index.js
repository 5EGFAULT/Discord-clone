import styled from "styled-components";
import Listbar from "../../components/Listbar";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-wrap: nowrap;
`;
const Body = styled.div`
  flex: 1;
  background-color: #37393f;
`;
function Home() {
  return (
    <Container>
      <Listbar></Listbar>
      <Body></Body>
    </Container>
  );
}

export default Home;
