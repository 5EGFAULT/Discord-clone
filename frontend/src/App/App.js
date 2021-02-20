// import styled from "styled-components";
import Auth from "../components/Auth";

import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Route exact path={["/login", "/register"]} component={Auth} />
    </Router>
  );
}

export default App;
