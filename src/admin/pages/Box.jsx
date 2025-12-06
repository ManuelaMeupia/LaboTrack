import React, { useState } from "react";

function Box() {
  const [box, setBox] = useState([
    { id: 1, nom: "Box A", frigo: "Frigo A", capacite: 20 },
    { id: 2, nom: "Box B", frigo: "Frigo B", capacite: 15 },
  ]);

  const [showModal, setShowModal] = useState(false);

  const [newBox, setNewBox] = useState({
    nom: "",
    frigo: "",
    capacite: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNewBox(prev => ({ ...prev, [name]: value }));
  }

  function ajouterBox(e) {
    e.preventDefault();

    setBox(prev => [
      ...prev,
      { id: Date.now(), ...newBox }
    ]);

    setShowModal(false);
    setNewBox({ nom: "", frigo: "", capacite: "" });
  }

  return (
    <div>
      <h2>Gestion des Box</h2>

      <button className="btn-primary" style={{ marginTop: "15px" }}
        onClick={() => setShowModal(true)}
      >
        + Ajouter une Box
      </button>

      <table className="table" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Frigo</th>
            <th>Capacité</th>
          </tr>
        </thead>

        <tbody>
          {box.map(b => (
            <tr key={b.id}>
              <td>{b.nom}</td>
              <td>{b.frigo}</td>
              <td>{b.capacite}</td>
            </tr>
          ))}
        </tbody>
      </table>


      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">

            <h3>Ajouter une Box</h3>

            <form onSubmit={ajouterBox}>

              <input
                className="input"
                name="nom"
                placeholder="Nom"
                value={newBox.nom}
                onChange={handleChange}
                required
              />

              <input
                className="input"
                name="frigo"
                placeholder="Frigo"
                value={newBox.frigo}
                onChange={handleChange}
                required
              />

              <input
                className="input"
                name="capacite"
                type="number"
                placeholder="Capacité"
                value={newBox.capacite}
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

export default Box;
