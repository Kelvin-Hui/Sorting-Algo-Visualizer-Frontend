import React from "react";
import "./App.css";

import Header from "./components/Header";
import Body from "./components/Body";

function App() {
  return (
    <div
      className="grid-container"
      style={{ height: `${window.innerHeight - 5}px` }}
    >
      <Header />
      <Body />
    </div>
  );
}

export default App;
