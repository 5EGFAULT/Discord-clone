// import styled from "styled-components";
import Login from "../Login";
import Register from "../Register";
import Home from "../Home";
import ChannelRoom from "../ChannelRoom";
import ServerListPage from "../ServerListPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register}></Route>
      <Route path="/channel/:id" component={ChannelRoom} />
      <Route path="/server/:id" component={ServerListPage} />
      {/* chanell list without chat lisr*/}
      {/* <Route path="/" component={ChannelRoom} /> */}
      {/* server list without chat lisr*/}
      {/* <Route path="/" component={Home} /> */}
    </Router>
  );
}

export default App;
