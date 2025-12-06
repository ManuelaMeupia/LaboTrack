import React from "react";
import { FaBox, FaWarehouse, FaVial, FaList } from "react-icons/fa";

function Home() {
  // Données temporaires (mock data)
  const stats = {
    frigos: 4,
    box: 18,
    categories: 6,
    echantillons: 248,
  };

  const derniersEchantillons = [
    { id: 1, nom: "Sang - Patient 045", date: "2025-02-10" },
    { id: 2, nom: "Urine - Patient 032", date: "2025-02-10" },
    { id: 3, nom: "Plasma - Patient 088", date: "2025-02-09" },
    { id: 4, nom: "Salive - Patient 120", date: "2025-02-09" },
    { id: 5, nom: "Tissu - Patient 099", date: "2025-02-08" },
  ];

  return (
    <div style={styles.container}>
      <h2>Tableau de bord</h2>

      {/* Cartes statistiques */}
      <div style={styles.cards}>

        <div style={styles.card}>
          <FaWarehouse style={styles.icon} />
          <h3>{stats.frigos}</h3>
          <p>Frigos</p>
        </div>

        <div style={styles.card}>
          <FaBox style={styles.icon} />
          <h3>{stats.box}</h3>
          <p>Box</p>
        </div>

        <div style={styles.card}>
          <FaList style={styles.icon} />
          <h3>{stats.categories}</h3>
          <p>Catégories</p>
        </div>

        <div style={styles.card}>
          <FaVial style={styles.icon} />
          <h3>{stats.echantillons}</h3>
          <p>Échantillons</p>
        </div>

      </div>

      {/* Derniers échantillons */}
      <div style={styles.tableCard}>
        <h3>Derniers échantillons ajoutés</h3>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Date d'ajout</th>
            </tr>
          </thead>

          <tbody>
            {derniersEchantillons.map((e) => (
              <tr key={e.id}>
                <td>{e.nom}</td>
                <td>{e.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  cards: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "30px",
  },
  card: {
    width: "23%",
    background: "white",
    padding: "20px",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  icon: {
    fontSize: "30px",
    marginBottom: "10px",
    color: "#052c65",
  },
  tableCard: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    marginTop: "15px",
    borderCollapse: "collapse",
  },
  thtd: {
    padding: "10px",
  },
};

export default Home;
