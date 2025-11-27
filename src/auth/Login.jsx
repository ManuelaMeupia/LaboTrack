import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/AxiosConfig";
import { AuthContext } from "./AuthContext";

function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function redirectUser(role) {
        if (role === "admin") navigate("/admin/dashboard");
        else if (role === "personnel") navigate("/personnel/dashboard");
        else if (role === "visiteur") navigate("/visiteur/dashboard");
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        try {
            const response = await api.post("/auth/login", formData);

            login(response.data.user); // stocker user dans AuthContext
            redirectUser(response.data.user.role);

        } catch (err) {
            setError("Email ou mot de passe incorrect.");
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
                        name="password"
                        placeholder="Mot de passe"
                        value={formData.password}
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

// --------------------- Styles ---------------------
const styles = {
    container: {
        height: "100vh",
        background: "#f0f2f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    card: {
        width: "350px",
        padding: "30px",
        background: "#fff",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
    },
    title: {
        fontSize: "28px",
        marginBottom: "10px",
        color: "#0056b3"
    },
    subtitle: {
        fontSize: "16px",
        marginBottom: "20px",
        color: "#666"
    },
    input: {
        width: "100%",
        padding: "12px",
        marginBottom: "12px",
        borderRadius: "8px",
        border: "1px solid #ccc"
    },
    button: {
        width: "100%",
        padding: "12px",
        background: "#0056b3",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer"
    },
    error: {
        color: "red",
        marginBottom: "10px"
    }
};

export default Login;
