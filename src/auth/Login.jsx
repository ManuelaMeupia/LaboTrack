import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/AxiosConfig";
import { AuthContext } from "./AuthContext";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    mot_de_passe: "",
  });

  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
  e.preventDefault();
  setError("");

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    console.log("DATA:", data);

    if (!response.ok) {
      setError(data.message);
      return;
    }

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);

    login(data.user, data.token);
    navigate("/admin/home");

  } catch (err) {
    console.log(err);
    setError("Erreur serveur");
  }
}

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>LaboTrack</h1>
        <p style={styles.subtitle}>Connectez-vous pour continuer</p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Adresse email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="password"
            name="mot_de_passe"
            placeholder="Mot de passe"
            value={formData.mot_de_passe}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "#f0f2f5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "350px",
    padding: "30px",
    background: "#fff",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "28px",
    marginBottom: "10px",
    color: "#0056b3",
  },
  subtitle: {
    fontSize: "16px",
    marginBottom: "20px",
    color: "#666",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#0056b3",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};

export default Login;
