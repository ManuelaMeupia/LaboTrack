import React, { useState } from "react";

function Categories() {
  const [categories, setCategories] = useState([
    { id: 1, nom: "Sang" },
    { id: 2, nom: "Urine" },
    { id: 3, nom: "Tissu" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newCat, setNewCat] = useState("");

  function ajouterCategorie(e) {
    e.preventDefault();

    setCategories(prev => [
      ...prev,
      { id: Date.now(), nom: newCat }
    ]);

    setShowModal(false);
    setNewCat("");
  }

  return (
    <div>
      <h2>Gestion des Catégories</h2>

      <button className="btn-primary" style={{ marginTop: "15px" }}
        onClick={() => setShowModal(true)}
      >
        + Ajouter une Catégorie
      </button>

      <table className="table" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Nom</th>
          </tr>
        </thead>

        <tbody>
          {categories.map(c => (
            <tr key={c.id}>
              <td>{c.nom}</td>
            </tr>
          ))}
        </tbody>
      </table>


      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">

            <h3>Ajouter une Catégorie</h3>

            <form onSubmit={ajouterCategorie}>
              <input
                className="input"
                placeholder="Nom de la catégorie"
                value={newCat}
                onChange={(e) => setNewCat(e.target.value)}
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

export default Categories;
