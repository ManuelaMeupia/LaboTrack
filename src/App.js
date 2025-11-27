import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./auth/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* <Route path="/" element={<h1 style={{ color: "red" }}>LaboTrack fonctionne !</h1>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
