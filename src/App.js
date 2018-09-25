import React from "react";
import { BrowserRouter } from "react-router-dom";
import Browse from "./main/components/Browse/Browse.js";
import Content from "./main/components/Content/Content.js";
import "./App.css";

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Browse />
      <Content />
    </div>
  </BrowserRouter>
);

export default App;
