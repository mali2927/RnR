import React from "react";
import "../css/App.css";
import MultipeInput from "./multipeInput";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Showdata from "./showData";
function App() {
  let component;
  switch (window.location.pathname) {
    case "/":
      component = <MultipeInput></MultipeInput>;
      break;
    case "/showdata":
      component = <Showdata></Showdata>;
  }
  return (
    <>
      <NavBar></NavBar>

      <div className="App">
        <header className="App-header">
          <h1>Return & Repair</h1>
          {component}
        </header>
      </div>
    </>
  );
}

export default App;
