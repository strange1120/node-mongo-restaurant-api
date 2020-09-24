import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";

const App = () => {
  return (
    <Router>
      <Route path="/" exact={true} component={Landing} />
    </Router>
  );
};

export default App;
