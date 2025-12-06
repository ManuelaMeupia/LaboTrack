import React, { useState } from "react";

function Frigos() {
  const [frigos, setFrigos] = useState([
    { id: 1, nom: "Frigo A", localisation: "Salle 1", capacite: 120 },
    { id: 2, nom: "Frigo B", localisation: "Salle 2", capacite: 90 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newFrigo, setNewFrigo] = useState({
    nom: "",
    localisation: "",
    capacite: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNewFrigo(prev => ({ ...prev, [name]: value }));
  }

  function ajouterFrigo(event) {
    event.preventDefault();

    setFrigos(prev => [
      ...prev,
      { id: Date.now(), ...newFrigo }
    ]);

    setShowModal(false);
    setNewFrigo({ nom: "", localisation: "", capacite: "" });
  }

  return (
    <div>
      <h2>Gestion des Frigos</h2>

      <button className="btn-primary" style={{ marginTop: "15px" }}
        onClick={() => setShowModal(true)}
      >
        + Ajouter un Frigo
      </button>

      <table className="table" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Localisation</th>
            <th>Capacité</th>
          </tr>
        </thead>

        <tbody>
          {frigos.map(f => (
            <tr key={f.id}>
              <td>{f.nom}</td>
              <td>{f.localisation}</td>
              <td>{f.capacite}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal ajout */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">

            <h3>Ajouter un Frigo</h3>

            <form onSubmit={ajouterFrigo}>
              <input
                className="input"
                name="nom"
                placeholder="Nom"
                value={newFrigo.nom}
                onChange={handleChange}
                required
              />

              <input
                className="input"
                name="localisation"
                placeholder="Localisation"
                value={newFrigo.localisation}
                onChange={handleChange}
                required
              />

              <input
                className="input"
                name="capacite"
                placeholder="Capacité"
                type="number"
                value={newFrigo.capacite}
                onChange={handleChange}
                required
              />

              <button className="btn-primary" type="submit">
                Ajouter
              </button>
            </form>

            <button className="btn-danger" style={{ marginTop: "10px" }}
              onClick={() => setShowModal(false)}
            >
              Annuler
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default Frigos;
