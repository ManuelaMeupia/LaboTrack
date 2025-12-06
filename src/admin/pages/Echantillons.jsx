import React, { useState } from "react";

function Echantillons() {
  const [echantillons, setEchantillons] = useState([
    { id: 1, nom: "Sang - P01", categorie: "Sang", box: "Box A" },
    { id: 2, nom: "Urine - P02", categorie: "Urine", box: "Box B" },
  ]);

  const [showModal, setShowModal] = useState(false);

  const [newEch, setNewEch] = useState({
    nom: "",
    categorie: "",
    box: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setNewEch(prev => ({ ...prev, [name]: value }));
  }

  function ajouterEchantillon(e) {
    e.preventDefault();

    setEchantillons(prev => [
      ...prev,
      { id: Date.now(), ...newEch }
    ]);

    setShowModal(false);
    setNewEch({ nom: "", categorie: "", box: "" });
  }

  return (
    <div>
      <h2>Gestion des Échantillons</h2>

      <button className="btn-primary" style={{ marginTop: "15px" }}
        onClick={() => setShowModal(true)}
      >
        + Ajouter un Échantillon
      </button>

      <table className="table" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Catégorie</th>
            <th>Box</th>
          </tr>
        </thead>

        <tbody>
          {echantillons.map(e => (
            <tr key={e.id}>
              <td>{e.nom}</td>
              <td>{e.categorie}</td>
              <td>{e.box}</td>
            </tr>
          ))}
        </tbody>
      </table>


      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">

            <h3>Ajouter un Échantillon</h3>

            <form onSubmit={ajouterEchantillon}>
              <input
                className="input"
                name="nom"
                placeholder="Nom"
                value={newEch.nom}
                onChange={handleChange}
                required
              />

              <input
                className="input"
                name="categorie"
                placeholder="Catégorie"
                value={newEch.categorie}
                onChange={handleChange}
                required
              />

              <input
                className="input"
                name="box"
                placeholder="Box"
                value={newEch.box}
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

export default Echantillons;
