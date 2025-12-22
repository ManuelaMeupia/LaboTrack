import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./auth/Login";
import Dashboard from "./admin/Dashboard";
import Home from "./admin/pages/Home";
import Users from "./admin/pages/Users";
import Frigos from "./admin/pages/Frigos";
import Box from "./admin/pages/Box";
import Categories from "./admin/pages/Categories";
import Echantillons from "./admin/pages/Echantillons";

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PAGE LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* DASHBOARD ADMIN LAYOUT */}
        <Route path="/admin" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="frigos" element={<Frigos />} />
          <Route path="box" element={<Box />} />
          <Route path="categories" element={<Categories />} />
          <Route path="echantillons" element={<Echantillons />} />
        </Route>

        {/* Page par défaut */}
        <Route path="/" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
