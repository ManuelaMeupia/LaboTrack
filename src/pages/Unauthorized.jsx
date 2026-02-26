import React from "react";
import { useNavigate } from "react-router-dom";
import "./Unauthorized.css";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        <h1>403 - Accès Refusé</h1>
        <p>Vous n'avez pas les droits d'accès à cette page.</p>
        <button onClick={() => navigate("/login")} className="btn-login">
          Retour à la connexion
        </button>
      </div>
    </div>
  );
}

export default Unauthorized;
