import React from "react";
import { withRouter } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Browse from "./main/components/Browse/Browse.js";
import Content from "./main/components/Content/Content.js";
import "./App.css";

const BaseComponent = ({ match, location }) => {
  const analysis = location.pathname.substr(1);
  return (
    <div className="App">
      <Browse match={match} analysis={analysis} />
      <Content match={match} analysis={analysis} />
    </div>
  );
};

const WrappedComponent = withRouter(BaseComponent);

const App = () => (
  <BrowserRouter>
    <WrappedComponent />
  </BrowserRouter>
);

export default App;
