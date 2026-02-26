import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user } = useContext(AuthContext);

  // Tant que user est null, on ne décide rien
  if (user === null) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si allowedRoles est vide, accepter tous les utilisateurs authentifiés
  // Sinon, vérifier que l'utilisateur a le bon rôle
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default ProtectedRoute;
