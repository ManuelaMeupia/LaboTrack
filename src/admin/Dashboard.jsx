import React from "react";
import AdminSidebar from "./components/AdminSidebar";
import AdminNavbar from "./components/AdminNavbar";
import { Outlet } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user"));


function Dashboard() {
  
  return (
    <div style={styles.container}>

      <AdminSidebar />

      <div style={styles.content}>
        <AdminNavbar />
        <div style={styles.pageContainer}>
          <Outlet /> {/* ICI on affiche les pages */}
        </div>
      </div>

    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  pageContainer: {
    padding: "20px",
    background: "#f5f5f5",
    height: "100%"
  }
};

export default Dashboard;
