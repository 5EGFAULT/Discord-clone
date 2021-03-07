import styled from "styled-components";
import defaultimg from "../../Icons/server.svg";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  selectid,
  selectUsername,
  selectUserpic,
  setisAuthenticated,
} from "../../Features/authSlice";
import store from "../../store";
const Container = styled.div`
  height: 52px;
  background-color: #292b2f;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding-left: 10px;
  padding-right: 10px;
  & svg.edit {
    fill: ${(props) => (props.ishoverd ? "white" : "#b9bbbe")};
  }
  position: relative;
`;
const Avatar = styled.div`
  width: 40px;
  background-color: #36393f;
  height: 40px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-image: url(${(props) => props.img});
  background-size: ${(props) => (props.haspic ? "cover" : "auto")};
  background-repeat: no-repeat;
  background-position: center;
`;
const Username = styled.div`
  cursor: default;
  padding-left: 10px;
  color: white;
  flex: 1;
`;

const Options = styled.div`
  text-transform: capitalize;
  font-family: "Whitney Medium Regular";
  font-size: 16px;
  border-radius: 4px;
  position: absolute;
  left: 120px;
  bottom: 60px;
  min-height: 48px;
  min-width: 150px;
  /* padding: 8px; */
  background-color: #202225;
  color: white;
  align-items: center;
  justify-content: center;
  display: ${(props) => (props.isdropped ? "flex" : "none")};
  &:after {
    content: "";
    position: absolute;
    bottom: -5px;
    right: 10px;
    width: 10px;
    height: 10px;
    background-color: #202225;
    transform: rotate(45deg);
  }
  flex-direction: column;
  & a {
    text-transform: capitalize;
    font-family: "Whitney Medium Regular";
    font-size: 16px;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
    width: 100%;
    height: 30px;
    &:hover {
      background-color: #37393f;
    }
  }
`;
function UserPanel() {
  const username = useSelector(selectUsername);
  const dispatch = useDispatch();
  const user_pic = useSelector(selectUserpic);
  const user_id = useSelector(selectid);
  const [ishoverd, setishoverd] = useState(false);
  const [isdropped, setisdropped] = useState(false);
  console.log(
    `http://localhost:3003/uploads/users/${store.getState().auth.userpic}`
  );
  return (
    <Container ishoverd={ishoverd}>
      <Avatar
        haspic={store.getState().auth.userpic != null}
        img={
          store.getState().auth.userpic != null
            ? // user_pic != null
              // ? `http://localhost:3003/uploads/users/${user_pic}`
              `http://localhost:3003/uploads/users/${
                store.getState().auth.userpic
              }`
            : defaultimg
        }
      />
      <Username>{username}</Username>
      <Options isdropped={isdropped}>
        <Link onClick={() => dispatch(setisAuthenticated(false))} to="/login">
          Logout
        </Link>
        <Link to="/edit">Edit Profile</Link>
      </Options>
      <svg
        onMouseEnter={() => setishoverd(true)}
        onMouseLeave={() => setishoverd(false)}
        onClick={() => setisdropped(!isdropped)}
        className="edit"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          // fillRule="evenodd"
          // clipRule="evenodd"
          // fill="#B9BBBE"
          d="M15.4483 7.33329H17.3333V10.6666H15.4491C15.2483 11.4425 14.9166 12.165 14.4708 12.8033L15.6666 14L14 15.6666L12.8041 14.47C12.1641 14.9158 11.4433 15.2483 10.6666 15.4483V17.3333H7.33329V15.4483C6.55746 15.2483 5.83579 14.9158 5.19663 14.47L3.99996 15.6666L2.33329 14L3.52996 12.8033C3.08413 12.1658 2.75163 11.4433 2.55163 10.6666H0.666626V7.33329H2.55163C2.75163 6.55663 3.08329 5.83496 3.52996 5.19663L2.33329 3.99996L3.99996 2.33329L5.19663 3.52996C5.83496 3.08329 6.55663 2.75163 7.33329 2.55163V0.666626H10.6666V2.55079C11.4433 2.75163 12.1641 3.08329 12.8041 3.52913L14 2.33246L15.6666 3.99913L14.47 5.19663C14.9158 5.83496 15.2483 6.55746 15.4483 7.33329ZM8.99996 12.3333C10.8409 12.3333 12.3333 10.8409 12.3333 8.99996C12.3333 7.15901 10.8409 5.66663 8.99996 5.66663C7.15901 5.66663 5.66663 7.15901 5.66663 8.99996C5.66663 10.8409 7.15901 12.3333 8.99996 12.3333Z"
        />
      </svg>
    </Container>
  );
}
export default UserPanel;
