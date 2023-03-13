import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./InputForm/App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import NavBar from "./InputForm/NavBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Showdata from "./InputForm/showData";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
