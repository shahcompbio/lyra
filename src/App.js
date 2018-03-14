import React from "react";
import BrowsePanel from "./browse/components/BrowsePanel.js";
import Listener from "./Listener.js";
import Content from "./main/components/Content.js";
import "./App.css";

const App = () => (
  <div className="App">
    <BrowsePanel />
    <Content />
    <Listener />
  </div>
);

export default App;
