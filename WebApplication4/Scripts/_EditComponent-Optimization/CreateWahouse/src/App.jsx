import React from "react";
import CreateWereHouse from "./components/CreateWereHouse";
import "./App.css";
import { Button } from "antd";
import { useRef } from "react";

function App(props) {
  
  return (
    <div style={{width:"100%", overflow:"hidden", 
    // backgroundColor:"#f1f1f1",
    minHeight:"100vh"}}>
      <CreateWereHouse/>
    </div>
  );
}

export default App;
