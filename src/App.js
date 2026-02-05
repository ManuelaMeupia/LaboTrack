import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./auth/Login";
import ProtectedRoute from "./auth/ProtectedRoute";

import Dashboard from "./admin/Dashboard";
import Home from "./admin/pages/Home";
import Users from "./admin/pages/Users";
import Frigos from "./admin/pages/Frigos";
import Box from "./admin/pages/Box";
import Categories from "./admin/pages/Categories";
import Echantillons from "./admin/pages/Echantillons";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* ROUTES ADMIN PROTÉGÉES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="frigos" element={<Frigos />} />
          <Route path="box" element={<Box />} />
          <Route path="categories" element={<Categories />} />
          <Route path="echantillons" element={<Echantillons />} />
        </Route>

        {/* Défaut */}
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
