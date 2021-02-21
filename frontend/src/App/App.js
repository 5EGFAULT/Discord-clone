// import styled from "styled-components";
import Auth from "../components/Auth";
import Home from "../components/Home";

import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Route exact path={["/login", "/register"]} component={Auth} />
      <Route path="/" component={Home} />
    </Router>
  );
}

export default App;
