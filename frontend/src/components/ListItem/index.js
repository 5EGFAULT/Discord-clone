import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { changeserver_id } from "../../Features/serverSlice";
import { useSelector, useDispatch } from "react-redux";

// import { import serverimg from "../../../../Icons/server.svg";
const Container = styled.div`
  position: relative;
  width: 72px;
  /* background-color: red; */
  height: 48px;
  margin-bottom: 8px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`;
const Avatar = styled.div`
  width: 48px;
  background-color: #36393f;
  height: 48px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  & img {
    /* max-width: 48px;
    max-height: 48px; */
    max-height: 48px;
    border-radius: 16px;
  }
`;
const Tooltip = styled.div`
  text-transform: capitalize;
  font-family: "Whitney Medium Regular";
  border-radius: 4px;
  position: absolute;
  left: 80px;
  z-index: 100;
  min-height: 48px;
  min-width: 150px;
  padding: 8px;
  background-color: #202225;
  color: white;
  align-items: center;
  justify-content: center;
  display: ${(props) => (props.isshowed ? "flex" : "none")};
  &:before {
    content: "";
    position: absolute;
    left: -5px;
    width: 10px;
    height: 10px;
    background-color: #202225;
    transform: rotate(45deg);
  }
`;
function ListItem({ img, servername, id }) {
  const [isshowed, setisshowed] = useState(false);
  const dispatch = useDispatch();
  return (
    <Link onClick={() => dispatch(changeserver_id(id))} to={"/server/" + id}>
      <Container>
        <Avatar
          onMouseEnter={(e) => setisshowed(true)}
          onMouseLeave={(e) => setisshowed(false)}
        >
          <img src={img} />
        </Avatar>
        <Tooltip isshowed={isshowed}>{servername}</Tooltip>
      </Container>
    </Link>
  );
}
export default ListItem;
