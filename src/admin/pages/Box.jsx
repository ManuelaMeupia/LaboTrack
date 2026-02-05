import React, { useEffect, useState } from "react";
import api from "../../api/AxiosConfig";

function Box() {
  const [boxs, setBoxs] = useState([]);
  const [frigos, setFrigos] = useState([]);

  const [formData, setFormData] = useState({
    nom: "",
    capacite: "",
    frigoId: "",
  });

  // Charger box + frigos
  useEffect(() => {
    fetchBoxs();
    fetchFrigos();
  }, []);

  async function fetchBoxs() {
    const res = await api.get("/boxs");
    setBoxs(res.data);
  }

  async function fetchFrigos() {
    const res = await api.get("/frigos");
    setFrigos(res.data);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await api.post("/boxs", formData);

    setFormData({
      nom: "",
      capacite: "",
      frigoId: "",
    });

    fetchBoxs();
  }

  async function handleDelete(id) {
    if (window.confirm("Supprimer cette box ?")) {
      await api.delete(`/boxs/${id}`);
      fetchBoxs();
    }
  }

  return (
    <div>
      <h2>Gestion des Box</h2>

      {/* FORMULAIRE */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="nom"
          placeholder="Nom de la box"
          value={formData.nom}
          onChange={handleChange}
          required
        />

        <input
          name="capacite"
          placeholder="Capacité"
          value={formData.capacite}
          onChange={handleChange}
          required
        />

        <select
          name="frigoId"
          value={formData.frigoId}
          onChange={handleChange}
          required
        >
          <option value="">Choisir un frigo</option>
          {frigos.map((frigo) => (
            <option key={frigo._id} value={frigo._id}>
              {frigo.nom}
            </option>
          ))}
        </select>

        <button type="submit">Ajouter</button>
      </form>

      {/* TABLEAU */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Capacité</th>
            <th>Frigo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {boxs.map((box) => (
            <tr key={box._id}>
              <td>{box.nom}</td>
              <td>{box.capacite}</td>
              <td>{box.frigoId?.nom}</td>
              <td>
                <button onClick={() => handleDelete(box._id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};

export default Box;
