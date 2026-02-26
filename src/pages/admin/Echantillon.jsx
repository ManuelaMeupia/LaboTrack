import React, { useEffect, useState } from "react";
import api from "../api/AxiosConfig";

function Echantillons() {
  <h1>JE SUIS DANS LE BON FICHIER</h1>

  const [samples, setSamples] = useState([]);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchSamples();
  }, []);

  const fetchSamples = async () => {
    const res = await api.get("/samples");
    setSamples(res.data);
  };

  const handleSearch = async () => {
    if (!search) return;

    try {
      const res = await api.get(`/samples/search/${search}`);
      setResult(res.data);
    } catch (error) {
      alert("Échantillon non trouvé");
      setResult(null);
    }
  };

  const deleteSample = async (id) => {
    if (window.confirm("Supprimer cet échantillon ?")) {
      await api.delete(`/samples/${id}`);
      fetchSamples();
      setResult(null);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gestion des Échantillons</h2>

      {/*Recherche */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Rechercher par identifiant"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Rechercher</button>
        <button onClick={() => { setResult(null); setSearch(""); }}>
          Réinitialiser
        </button>
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Identifiant</th>
            <th>Catégorie</th>
            <th>Sexe</th>
            <th>Âge</th>
            <th>Localité</th>
            <th>Communauté</th>
            <th>Frigo</th>
            <th>Box</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {(result ? [result] : samples).map((s) => (
            <tr key={s._id}>
              <td>{s.identifiant}</td>
              <td>{s.categorie}</td>
              <td>{s.sexe}</td>
              <td>{s.age}</td>
              <td>{s.localite}</td>
              <td>{s.communaute}</td>
              <td>{s.frigoId?.nom}</td>
              <td>{s.boxId?.nom}</td>
              <td>{s.position}</td>
              <td>
                <button onClick={() => deleteSample(s._id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Echantillons;
