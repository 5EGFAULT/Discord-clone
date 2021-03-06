import styled from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Listbar from "../../components/Listbar";
import Sidebar from "../../components/Sidebar";
import Chat from "../Chat";
import { selectisAuthenticated } from "../../Features/authSlice";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-wrap: nowrap;
`;
const Body = styled.div`
  flex: 1;
  background-color: #37393f;
`;
function ServerListPage() {
  const isAuthenticated = useSelector(selectisAuthenticated);
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  } else {
    return (
      <Container>
        <Listbar></Listbar>
        <Sidebar></Sidebar>
        <Body></Body>
      </Container>
    );
  }
}

export default ServerListPage;
