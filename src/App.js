import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./auth/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";

// ADMIN
import Dashboard from "./admin/Dashboard";
import Home from "./admin/pages/Home";
import HomeDemo from "./admin/pages/HomeDemo";
import Users from "./admin/pages/Users";
import Frigos from "./admin/pages/Frigos";
import Box from "./admin/pages/Box";
import Categories from "./admin/pages/Categories";
import Echantillons from "./admin/pages/Echantillons";
import BoxGrid from "./pages/admin/BoxGrid";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= LOGIN ================= */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* ================= ADMIN ================= */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="demo" element={<HomeDemo />} />
          <Route path="users" element={<Users />} />
          <Route path="frigos" element={<Frigos />} />
          <Route path="box" element={<Box />} />
          <Route path="categories" element={<Categories />} />
          <Route path="echantillons" element={<Echantillons />} />
          <Route path="box/:boxId/grid" element={<BoxGrid />} />
        </Route>

        {/* ================= PERSONNEL ================= */}
        <Route
          path="/personnel/home"
          element={
            <ProtectedRoute allowedRoles={["admin", "personnel"]}>
              <Echantillons />
            </ProtectedRoute>
          }
        />

        {/* ================= VISITEUR ================= */}
        <Route
          path="/visiteur/home"
          element={
            <ProtectedRoute allowedRoles={["admin", "personnel", "visiteur"]}>
              <Echantillons />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
