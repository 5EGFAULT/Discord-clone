import styled from "styled-components";
import hashtag from "../../Icons/hashtag.svg";
import { Link } from "react-router-dom";

const Styledlink = styled(Link)`
  text-decoration: none;
`;

const Container = styled.div`
  cursor: default;
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
    text-decoration: none;
    font-family: "Whitney Medium Regular";
    font-size: 16px;
    line-height: 20px;
    /* color: #8e9297; */
    color: ${(props) => (props.isSelected ? "#fff" : "#8e9297")};
  }

  &:hover {
    background-color: #20222599;
  }
`;
// use redux state to get the selected chanel set isselected
function ListItemChanel({ channel }) {
  return (
    <Styledlink to={channel.url}>
      <Container isSelected={false}>
        <img src={hashtag} />
        <div>{channel.name}</div>
      </Container>
    </Styledlink>
  );
}

export default ListItemChanel;
