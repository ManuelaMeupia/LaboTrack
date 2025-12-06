import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";

function AdminNavbar() {

  const { user, logout } = useContext(AuthContext);

  return (
    <div style={styles.nav}>
      <p>Bienvenue, {user?.name}</p>
      <button onClick={logout} style={styles.logoutBtn}>Déconnexion</button>
    </div>
  );
}

const styles = {
  nav: {
  height: "60px",
  background: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px",
  borderRadius: "6px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
},

  logoutBtn: {
    background: "#c62828",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  }

  
};

export default AdminNavbar;
