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
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register}></Route>
      <Route path="/channel/:id" component={ChannelRoom} />
      <Route path="/server/:id" component={ServerListPage} />
      {/* chanell list without chat lisr*/}
      <Route exact path="/" component={Home} />
      {/* server list without chat lisr*/}
      {/* <Route path="/" component={Home} /> */}
    </Router>
  );
}

export default App;
