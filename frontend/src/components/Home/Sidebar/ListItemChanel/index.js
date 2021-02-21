import styled from "styled-components";
import hashtag from "../../../../Icons/hashtag.svg";

const Container = styled.div`
  height: 34px;
  width: 252px;
  background-color: ${(props) =>
    props.isSelected ? "#4f545c52" : "transparent"};
  border-radius: 4px;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  padding: 6px 8px;
  & img {
    margin-right: 6px;
  }
  & div {
    font-family: "Whitney Medium Regular";
    font-size: 16px;
    line-height: 20px;
    /* color: #8e9297; */
    color: ${(props) => (props.isSelected ? "#fff" : "#8e9297")};
  }
`;

function ListItemChanel({ isSelected, children }) {
  return (
    <Container isSelected={isSelected}>
      <img src={hashtag} />
      <div>{children}</div>
    </Container>
  );
}

export default ListItemChanel;
