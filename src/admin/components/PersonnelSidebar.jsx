// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { FaBox, FaWarehouse, FaList, FaVials, FaHome } from "react-icons/fa";

// function PersonnelSidebar() {
//   const location = useLocation();

//   const menu = [
//     { label: "Accueil", icon: <FaHome />, path: "/personnel/home" },
//     { label: "Frigos", icon: <FaWarehouse />, path: "/personnel/frigos" },
//     { label: "Box", icon: <FaBox />, path: "/personnel/box" },
//     { label: "Catégories", icon: <FaList />, path: "/personnel/categories" },
//     { label: "Échantillons", icon: <FaVials />, path: "/personnel/echantillons" },
//   ];

//   return (
//     <div style={styles.sidebar}>
//       <h2 style={styles.logo}>LaboTrack</h2>

//       {menu.map((item, index) => (
//         <Link
//           key={index}
//           to={item.path}
//           style={{
//             ...styles.link,
//             ...(location.pathname === item.path ? styles.activeLink : {})
//           }}
//         >
//           <span style={styles.icon}>{item.icon}</span>
//           {item.label}
//         </Link>
//       ))}
//     </div>
//   );
// }

// const styles = {
//   sidebar: {
//     width: "230px",
//     background: "#052c65",
//     color: "white",
//     padding: "20px",
//     display: "flex",
//     flexDirection: "column",
//   },
//   logo: {
//     marginBottom: "30px",
//     fontSize: "22px",
//     textAlign: "center",
//     fontWeight: "bold",
//   },
//   link: {
//     color: "white",
//     textDecoration: "none",
//     marginBottom: "12px",
//     fontSize: "16px",
//     padding: "10px",
//     borderRadius: "6px",
//     display: "flex",
//     alignItems: "center",
//     transition: "0.3s",
//   },
//   activeLink: {
//     background: "rgba(255,255,255,0.25)",
//   },
//   icon: {
//     marginRight: "10px",
//   },
// };

// export default PersonnelSidebar;
