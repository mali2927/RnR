import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Showdata from "./Showdata";
import App from "./App";

const DataRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<App />} />
            <Route exact path="./showdata" element={<Showdata />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default DataRoutes;
