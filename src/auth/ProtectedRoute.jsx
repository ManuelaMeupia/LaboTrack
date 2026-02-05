import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  // 🔴 Tant que user est null, on ne décide rien
  if (user === null) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
