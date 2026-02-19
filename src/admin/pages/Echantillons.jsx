import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import api from "../../api/AxiosConfig";

function Echantillons() {
  const { user } = useContext(AuthContext);

  const [echantillons, setEchantillons] = useState([]);
  const [nom, setNom] = useState("");

  const canAdd = ["admin", "personnel"].includes(user?.role);
  const canEdit = ["admin", "personnel"].includes(user?.role);
  const canDelete = user?.role === "admin";
  const readOnly = user?.role === "visiteur";

  useEffect(() => {
    fetchEchantillons();
  }, []);

  const fetchEchantillons = async () => {
    try {
      const response = await api.get("/samples");
      setEchantillons(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async () => {
    // if (!nom) return;
    try {
      await api.post("/samples", { 
        identifiant: "TEST123",
        categorie: "Sang",
        sexe: "Masculin",
        age:30,
        localite: "Yaoundé",
        communaute: "Test",
        frigoId: "69844339ca050ea590037809",
        boxId: "69845b159a77d80f7df48797",
        position:5
      });
      setNom("");
      fetchEchantillons();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/samples/${id}`);
      fetchEchantillons();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>Gestion des Échantillons</h2>
        <span style={styles.roleBadge(user?.role)}>
          {user?.role?.toUpperCase()}
        </span>
      </div>

      {/* FORMULAIRE */}
      {canAdd && (
        <div style={styles.form}>
          <input
            type="text"
            placeholder="Nom de l'échantillon"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleAdd} style={styles.addButton}>
            Ajouter
          </button>
        </div>
      )}

      {/* LISTE */}
      <div style={styles.listContainer}>
        {echantillons.length === 0 ? (
          <p style={{ color: "#777" }}>Aucun échantillon disponible.</p>
        ) : (
          echantillons.map((e) => (
            <div key={e._id} style={styles.card}>
              <span>{e.nom}</span>

              <div style={styles.actions}>
                {canEdit && (
                  <button style={styles.editButton}>
                    Modifier
                  </button>
                )}

                {canDelete && (
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDelete(e._id)}
                  >
                    Supprimer
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {readOnly && (
        <p style={styles.readOnly}>
          Mode lecture seule : modifications non autorisées.
        </p>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "30px",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },
  title: {
    margin: 0,
    color: "#003366"
  },
  roleBadge: (role) => ({
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    color: "white",
    background:
      role === "admin"
        ? "#d32f2f"
        : role === "personnel"
        ? "#1976d2"
        : "#757575"
  }),
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "25px"
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  addButton: {
    padding: "10px 16px",
    background: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    background: "#f8f9fa",
    borderRadius: "8px",
    border: "1px solid #e0e0e0"
  },
  actions: {
    display: "flex",
    gap: "8px"
  },
  editButton: {
    padding: "6px 12px",
    background: "#ff9800",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  deleteButton: {
    padding: "6px 12px",
    background: "#d32f2f",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  readOnly: {
    marginTop: "20px",
    color: "#888",
    fontStyle: "italic"
  }
};

export default Echantillons;
