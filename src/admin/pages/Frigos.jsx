import React, { useEffect, useState } from "react";
import api from "../../api/AxiosConfig";

function Frigos() {
  const [frigos, setFrigos] = useState([]);
  const [formData, setFormData] = useState({
    nom: "",
    code: "",
    localisation: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchFrigos();
  }, []);

  async function fetchFrigos() {
    const res = await api.get("/frigos");
    setFrigos(res.data);
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (editingId) {
      await api.put(`/frigos/${editingId}`, formData);
      setEditingId(null);
    } else {
      await api.post("/frigos", formData);
    }

    setFormData({ nom: "", code: "", localisation: "" });
    fetchFrigos();
  }

  async function handleDelete(id) {
    if (window.confirm("Supprimer ce frigo ?")) {
      await api.delete(`/frigos/${id}`);
      fetchFrigos();
    }
  }

  function handleEdit(frigo) {
    setFormData(frigo);
    setEditingId(frigo._id);
  }

  return (
    <div>
      <h2>Gestion des Frigos</h2>

      <form onSubmit={handleSubmit}>
        <input name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" required />
        <input name="code" value={formData.code} onChange={handleChange} placeholder="Code" required />
        <input name="localisation" value={formData.localisation} onChange={handleChange} placeholder="Localisation" required />
        <button type="submit">{editingId ? "Modifier" : "Ajouter"}</button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Code</th>
            <th>Localisation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {frigos.map((f) => (
            <tr key={f._id}>
              <td>{f.nom}</td>
              <td>{f.code}</td>
              <td>{f.localisation}</td>
              <td>
                <button onClick={() => handleEdit(f)}>Modifier</button>
                <button onClick={() => handleDelete(f._id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Frigos;
