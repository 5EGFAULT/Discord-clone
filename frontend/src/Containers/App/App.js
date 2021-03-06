// import styled from "styled-components";
import Login from "../Login";
import Register from "../Register";
import Home from "../Home";
import CreateServer from "../CreateServer";
import ChannelRoom from "../ChannelRoom";
import JoinServer from "../JoinServer";
import ServerListPage from "../ServerListPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/channel/:id" component={ChannelRoom} />
      <Route path="/server/:id" component={ServerListPage} />
      {/* chanell list without chat lisr*/}
      <Route exact path="/Create" component={CreateServer} />
      <Route exact path="/Join" component={JoinServer} />
      <Route exact path="/" component={Home} />
      {/* server list without chat lisr*/}
      {/* <Route path="/" component={Home} /> */}
    </Router>
  );
}

export default App;
