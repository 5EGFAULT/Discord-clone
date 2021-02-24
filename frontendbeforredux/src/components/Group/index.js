import styled from "styled-components";
import ListItemChanel from "../ListItemChanel";
import { useState } from "react";
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
`;
function Group({ channels, title }) {
  const [isdropped, setisdropped] = useState(true);
  return (
    <Container>
      <GroupTitle onClick={() => setisdropped(!isdropped)}>
        <svg
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
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 10H10V15H8V10H3V8H8V3H10V8H15V10Z" fill="#8E9297" />
        </svg>
      </GroupTitle>
      <List isdropped={isdropped}>
        {channels.map((channel, i) => (
          <ListItemChanel key={i} channel={channel} />
        ))}
      </List>
    </Container>
  );
}
export default Group;
