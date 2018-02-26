import React from "react";
//import Sidebar from './sidebar/Sidebar.js'
import Listener from "./Listener.js";
import TreeCellscape from "./treeCellscape/TreeCellscape.js";
//import Content from './Content.js'
import "./App.css";

const App = () => (
  <div className="App">
    <TreeCellscape />
    <Listener />
  </div>
);

export default App;
