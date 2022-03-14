import styled from "styled-components";
import arrow from "../../Icons/arrow.svg";
import Group from "../Group";
import ListItemChanel from "../ListItemChanel";
import UserPanel from "../UserPanel";
import { useState, useEffect } from "react";
import axios from "axios";
import { selectserver_id } from "../../Features/serverSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectid } from "../../Features/authSlice";

const Container = styled.div`
  width: 272px;
  background-color: #2e3036;
  height: 100vh;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  position: relative;
`;
const ServerTopTitle = styled.div`
  width: 272px;
  height: 48px;
  box-shadow: 0 1px 0 rgba(4, 4, 5, 0.2), 0 1.5px 0 rgba(6, 6, 7, 0.05),
    0 2px 0 rgba(4, 4, 5, 0.05);
  display: flex;
  /* justify-content: center; */
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  font-family: "Whitney Semibold Regular";
  font-size: 16px;
  line-height: 20px;
  color: white;
  padding-bottom: 0px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 0px;
  position: relative;
  & div {
    text-transform: capitalize;
    font-family: "Whitney Medium Regular";
    border-radius: 4px;
    position: absolute;
    left: 270px;
    min-height: 48px;
    min-width: 150px;
    padding: 8px;
    background-color: #202225;
    color: white;
    align-items: center;
    justify-content: center;
    display: ${(props) => (props.ishoverd ? "flex" : "none")};
    &:before {
      content: "";
      position: absolute;
      left: -5px;
      width: 10px;
      height: 10px;
      background-color: #202225;
      transform: rotate(45deg);
    }
  }
`;
const GroupsContainer = styled.div`
  width: 272px;
  flex: 1;
  overflow-y: auto;
`;
const InputContainer = styled.div`
  display: ${(props) => (props.isdropped ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 80px;
  margin-bottom: 20px;
  margin-top: 20px;
  & input {
    padding-left: 10px;
    text-transform: capitalize;
    font-family: "Whitney Medium Regular";
    background-color: transparent;
    height: 35px;
    border: 1px solid #43b581;
    border-radius: 4px;
    color: white;
    &:focus {
      outline: none;
    }
  }
`;
function Sidebar({}) {
  const [groups, setgroups] = useState([]);
  const [isdropped, setisdropped] = useState(false);
  const [ishoverd, setishoverd] = useState(false);
  const [updatepage, setupdatepage] = useState(false);
  const [channels, setchannels] = useState([]);
  const [servername, setservername] = useState([]);
  const server_id = useSelector(selectserver_id);
  const user_id = useSelector(selectid);
  // let { id } = useParams();
  useEffect(async () => {
    const result = await axios(
      "http://localhost:3003/server/find/" + server_id
    );
    setservername(result.data.data.server);
    setgroups(result.data.data.groups);
    setchannels(result.data.data.channels);
  }, [server_id, updatepage]);
  const submitGroupName = (e) => {
    if (e.keyCode == 13) {
      const config = {
        method: "POST",
        url: "http://localhost:3003/server/create-group",
        headers: {
          "Content-Type": "Application/json",
        },
        data: JSON.stringify({
          user_id: user_id,
          server_id: server_id,
          group_name: e.target.value,
        }),
      };
      axios(config)
        .then(function (response) {
          let result = response.data;
          console.log(result);
          if (result.err === null) {
            setupdatepage(!updatepage);
            setisdropped(false);
          } else {
            //! todo if err from backend
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <Container>
      <ServerTopTitle ishoverd={ishoverd}>
        {/* <span>{data}</span> */}
        <span>{servername[0] != undefined ? servername[0][1] : "..."}</span>
        {/* <img src={arrow} /> */}
        <svg
          onMouseEnter={() => setishoverd(true)}
          onMouseLeave={() => setishoverd(false)}
          onClick={() => setisdropped(!isdropped)}
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 10H10V15H8V10H3V8H8V3H10V8H15V10Z" fill="white" />
        </svg>

        {/* <Arrow width="18px" height="18px" color="white" /> */}
        <div>Create Group</div>
      </ServerTopTitle>
      <InputContainer isdropped={isdropped}>
        <input placeholder="Groupe name" onKeyDownCapture={submitGroupName} />
        {/* <button>Create Groupe</button> */}
      </InputContainer>
      <GroupsContainer>
        {groups.map((group, i) => (
          <Group
            setupdatepage={setupdatepage}
            updatepage={updatepage}
            key={group[0]}
            group_id={group[0]}
            title={group[1]}
            channels={channels
              .filter((channel) => channel[2] === group[0])
              .map((channel) => {
                return { name: channel[1], url: "/channel/" + channel[0] };
              })}
          ></Group>
        ))}
        {/* <ListItemChanel channel={{ name: "channel5", url: "/channel5" }} /> */}
      </GroupsContainer>
      <UserPanel></UserPanel>
    </Container>
  );
}
export default Sidebar;
