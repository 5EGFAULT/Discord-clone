import styled from "styled-components";
import Listbar from "../../components/Listbar";
import { selectisAuthenticated } from "../../Features/authSlice";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

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
  const isAuthenticated = useSelector(selectisAuthenticated);

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  } else {
    return (
      <Container>
        <Listbar></Listbar>
        <Body></Body>
      </Container>
    );
  }
}

export default Home;
