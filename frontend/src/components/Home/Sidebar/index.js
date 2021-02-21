import styled from "styled-components";
import arrow from "../../../Icons/arrow.svg";
import Arrow from "../../../Icons/Arrow";
import Group from "./Group";
import ListItemChanel from "./ListItemChanel";
import UserPanel from "./UserPanel";

const Container = styled.div`
  width: 272px;
  background-color: #2e3036;
  height: 100vh;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
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
`;
const GroupsContainer = styled.div`
  width: 272px;
  flex: 1;
  overflow-y: auto;

  /* background-color: red; */
`;
function Sidebar(props) {
  return (
    <Container>
      <ServerTopTitle>
        <span>{props.server_name}</span>
        <img src={arrow} />
        {/* <Arrow width="18px" height="18px" color="white" /> */}
      </ServerTopTitle>
      <GroupsContainer>
        <Group title="Title">
          <ListItemChanel>channel1</ListItemChanel>
          <ListItemChanel isSelected={true}>channel2</ListItemChanel>
          <ListItemChanel>channel3</ListItemChanel>
        </Group>
      </GroupsContainer>
      <UserPanel></UserPanel>
    </Container>
  );
}
export default Sidebar;
