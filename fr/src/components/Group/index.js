import styled from "styled-components";
import ListItemChanel from "../ListItemChanel";
import { useState } from "react";
import axios from "axios";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100%;
`;
const List = styled.div`
  display: ${(props) => (props.isdropped ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;
`;
const GroupTitle = styled.div`
  padding-left: 16px;
  padding-right: 8px;
  height: 40px;
  width: 100%;
  font-family: "Whitney Semibold Regular";
  align-items: center;
  display: flex;
  flex-wrap: nowrap;
  font-size: 12px;
  & div {
    /* margin-left: 8px; */
    margin-left: 5px;
    flex: 1;
    text-transform: uppercase;
    color: #8e9297;
    cursor: default;
  }
  &:hover div {
    color: #fff;
  }
  & .arrow {
    transform: rotate(${(props) => (props.isdropped ? "0deg" : "180deg")});
  }
  & .tooltip {
    text-transform: capitalize;
    font-family: "Whitney Medium Regular";
    font-size: 16px;
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
const InputContainer = styled.div`
  display: ${(props) => (props.isdroppedinput ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 80px;

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
function Group({ channels, title, setupdatepage, updatepage, group_id }) {
  const [isdropped, setisdropped] = useState(true);
  const [isdroppedinput, setisdroppedinput] = useState(false);
  const [ishoverd, setishoverd] = useState(false);
  const submitChannelName = (e) => {
    if (e.keyCode == 13) {
      const config = {
        method: "POST",
        url: "http://localhost:3003/server/create-Channel",
        headers: {
          "Content-Type": "Application/json",
        },
        data: JSON.stringify({
          group_id: group_id,
          Channel_name: e.target.value,
        }),
      };
      axios(config)
        .then(function (response) {
          let result = response.data;
          console.log(result);
          if (result.err === null) {
            setupdatepage(!updatepage);
            setisdroppedinput(false);
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
      <GroupTitle
        onClick={() => setisdropped(!isdropped)}
        ishoverd={ishoverd}
        isdropped={isdropped}
      >
        <svg
          className="arrow"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.295 4L6 6.2869L3.705 4L3 4.70403L6 7.7L9 4.70403L8.295 4Z"
            fill="#8E9297"
          />
        </svg>

        <div>{title}</div>
        <div className="tooltip">Create Channel</div>
        <svg
          className="add"
          onMouseEnter={() => setishoverd(true)}
          onMouseLeave={() => setishoverd(false)}
          onClick={(e) => {
            e.stopPropagation();
            setisdroppedinput(!isdroppedinput);
          }}
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 10H10V15H8V10H3V8H8V3H10V8H15V10Z" fill="#8E9297" />
        </svg>
      </GroupTitle>
      <InputContainer isdroppedinput={isdroppedinput}>
        <input
          placeholder="Channel name"
          onKeyDownCapture={submitChannelName}
        />
      </InputContainer>
      <List isdropped={isdropped}>
        {channels.map((channel, i) => (
          <ListItemChanel key={i} channel={channel} />
        ))}
      </List>
    </Container>
  );
}
export default Group;
