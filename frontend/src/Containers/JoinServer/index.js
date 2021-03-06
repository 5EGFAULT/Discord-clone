import styled from "styled-components";
import Listbar from "../../components/Listbar";
import ServerCard from "../../components/SeverCard";
import { useState, useEffect } from "react";
import axios from "axios";
import store from "../../store";
import { selectisAuthenticated } from "../../Features/authSlice";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-wrap: nowrap;
`;
const Body = styled.div`
  flex: 1;
  background-color: #37393f;
  overflow-y: auto;
`;
const Searchbar = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  margin-left: 20px;
  margin-right: 20px;
  & input {
    border-radius: 5px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
    height: 44px;
    width: 500px;
    border: none;
    background-color: #40444b;
    padding: 11px 16px;
    font-family: "Whitney Book Regular";
    font-size: 18px;
    color: #dcddde;
    &:focus {
      outline: none;
    }
  }
`;
const CardList = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
`;
let Servers_list;
function JoinServer() {
  const [servers, setservers] = useState([]);
  let history = useHistory();

  useEffect(async () => {
    const result = await axios("http://localhost:3003/server/getall");
    Servers_list = result.data.data;
    setservers(result.data.data);
  }, []);
  const searchfeild = (e) => {
    setservers(
      Servers_list.filter((server) =>
        server[1]
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase())
      )
    );
  };
  const isAuthenticated = useSelector(selectisAuthenticated);

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  } else {
    return (
      <Container>
        <Listbar></Listbar>
        <Body>
          <Searchbar>
            <input onChange={searchfeild} placeholder="Search server name" />
          </Searchbar>
          <CardList>
            {servers.map((server) => (
              <ServerCard
                key={server[0]}
                img={server[2]}
                servername={server[1]}
                serverid={server[0]}
                JoinServer={() => JoinserverApi(server[0], history)}
              ></ServerCard>
            ))}
          </CardList>
        </Body>
      </Container>
    );
  }
}

function JoinserverApi(serverid, history) {
  const config = {
    method: "POST",
    url: "http://localhost:3003/server/join",
    headers: {
      "Content-Type": "Application/json",
    },
    data: JSON.stringify({
      user_id: store.getState().auth.id,
      server_id: serverid,
    }),
  };
  axios(config)
    .then(function (response) {
      let result = response.data;
      console.log(result);
      if (result.err === null) {
        console.log(result);
        history.push("/server/" + serverid);
        //? redirect to the server
      } else {
        //! todo if err from backend
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default JoinServer;
