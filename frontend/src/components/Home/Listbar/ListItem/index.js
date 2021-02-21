import styled from "styled-components";

const Container = styled.div`
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
  & img {
    max-width: 48px;
    max-height: 48px;
    border-radius: 16px;
  }
`;
function ListItem({ img }) {
  return (
    <Container>
      {img === img ? (
        <Avatar>
          <img src={img} />
        </Avatar>
      ) : (
        <Avatar>
          <img src={img} />
        </Avatar>
      )}
    </Container>
  );
}
export default ListItem;
