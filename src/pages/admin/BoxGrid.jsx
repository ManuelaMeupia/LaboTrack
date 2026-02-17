import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/AxiosConfig";

function BoxGrid() {
  const { boxId } = useParams();

  const ROWS = 8;
  const COLS = 12;

  const CATEGORIES = [
    "Sang",
    "Plasma",
    "Sérum",
    "Selles",
    "Urine",
    "Crachats",
    "Microfilaires",
    "Snipes",
    "DBS",
    "Réactifs",
  ];

  const [samples, setSamples] = useState([]);
  const [box, setBox] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);

  const [formData, setFormData] = useState({
    identifiant: "",
    categorie: "",
    sexe: "",
    age: "",
    localite: "",
    communaute: "",
  });

  useEffect(() => {
    fetchSamples();
    fetchBox();
  }, [boxId]);

  async function fetchSamples() {
    const res = await api.get("/samples");
    const samplesInThisBox = res.data.filter(
      (s) => s.boxId?._id === boxId
    );
    setSamples(samplesInThisBox);
  }

  async function fetchBox() {
    const res = await api.get("/boxes");
    const currentBox = res.data.find((b) => b._id === boxId);
    setBox(currentBox);
  }

  function getSampleAtPosition(position) {
    return samples.find((s) => s.position === position);
  }

  function handleCellClick(position) {
    if (getSampleAtPosition(position)) return;
    setSelectedPosition(position);
    setShowModal(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await api.post("/samples", {
      ...formData,
      boxId: boxId,
      frigoId: box?.frigoId?._id,
      position: selectedPosition,
    });

    setShowModal(false);
    setFormData({
      identifiant: "",
      categorie: "",
      sexe: "",
      age: "",
      localite: "",
      communaute: "",
    });

    fetchSamples();
  }

  return (
    <div>
      <h2>Grille de la Box (96 emplacements)</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 60px)`,
          gap: "5px",
          marginTop: "20px",
        }}
      >
        {[...Array(ROWS * COLS)].map((_, index) => {
          const position = index + 1;
          const sample = getSampleAtPosition(position);

          return (
            <div
              key={position}
              onClick={() => handleCellClick(position)}
              style={{
                width: "60px",
                height: "60px",
                border: "1px solid black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: sample ? "#90ee90" : "#f5f5f5",
                cursor: sample ? "not-allowed" : "pointer",
                fontSize: "10px",
              }}
            >
              {sample ? sample.identifiant : position}
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Ajouter un échantillon</h3>

            <form onSubmit={handleSubmit}>
              <input
                name="identifiant"
                placeholder="Identifiant"
                value={formData.identifiant}
                onChange={handleChange}
                required
              />

              <select
                name="categorie"
                value={formData.categorie}
                onChange={handleChange}
                required
              >
                <option value="">Catégorie</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>

              <select
                name="sexe"
                value={formData.sexe}
                onChange={handleChange}
                required
              >
                <option value="">Sexe</option>
                <option value="Masculin">Masculin</option>
                <option value="Féminin">Féminin</option>
              </select>

              <input
                type="number"
                name="age"
                placeholder="Âge"
                value={formData.age}
                onChange={handleChange}
                required
              />

              <input
                name="localite"
                placeholder="Localité"
                value={formData.localite}
                onChange={handleChange}
                required
              />

              <input
                name="communaute"
                placeholder="Communauté"
                value={formData.communaute}
                onChange={handleChange}
                required
              />

              <button type="submit">Ajouter</button>
            </form>

            <button onClick={() => setShowModal(false)}>
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BoxGrid;
