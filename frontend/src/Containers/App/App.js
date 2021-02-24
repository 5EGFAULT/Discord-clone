// import styled from "styled-components";
import Login from "../Login";
import Register from "../Register";
import Home from "../Home";

import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register}></Route>
      <Route path="/" component={Home} />
    </Router>
  );
}

export default App;
