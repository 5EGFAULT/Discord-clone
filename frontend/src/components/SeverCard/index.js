import styled from "styled-components";
const Container = styled.div`
  cursor: default;
  width: 250px;
  height: 300px;
  background-color: #20222587;
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  & div {
    background-image: url(${(props) => props.img});
    background-size: cover;
    width: 100%;
    height: 70%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    margin-bottom: 8px;
  }
  & span {
    display: block;
    text-align: center;
    color: white;
    margin-bottom: 16px;
    font-family: "Whitney Semibold Regular";
    text-transform: capitalize;
  }

  & button {
    font-family: "Whitney Semibold Regular";
    text-transform: capitalize;
    color: white;
    width: 100px;
    height: 35px;
    border: none;
    border-radius: 8px;
    background-color: #43b581;
    &:hover {
      color: #43b581;
      border: 1px solid #43b581;

      background-color: transparent;
    }
    &:focus {
      outline: none;
    }
  }
`;

function ServerCard({ img, servername, serverid, JoinServer }) {
  return (
    <Container img={`http://localhost:3003/uploads/servers/${img}`}>
      <div></div>
      <span>{servername}</span>
      <button onClick={JoinServer}>join</button>
    </Container>
  );
}
export default ServerCard;
