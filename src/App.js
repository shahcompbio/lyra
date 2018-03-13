import React from "react";
import BrowsePanel from "./browse/components/BrowsePanel.js";
//import Listener from "./Listener.js";
import TreeCellscape from "./treeCellscape/TreeCellscape.js";
//import Content from './Content.js'
import "./App.css";

const App = () => (
  <div className="App">
    <BrowsePanel />
    <TreeCellscape />
  </div>
);

export default App;
