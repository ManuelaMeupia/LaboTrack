import React from "react";
import "../styles/Dashboard.css";

export default function RecentSamples({ samples = [], onDelete }) {
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString("fr-FR", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "-";
    }
  };

  return (
    <div className="recent-card" role="region" aria-label="Résumé des derniers échantillons">
      <h4>Derniers échantillons ajoutés</h4>
      <div className="recent-table">
        <table role="table" aria-label="Tableau des 8 derniers échantillons avec audit trail">
          <thead role="rowgroup">
            <tr role="row">
              <th role="columnheader" scope="col">
                Identifiant
              </th>
              <th role="columnheader" scope="col">
                Catégorie
              </th>
              <th role="columnheader" scope="col">
                Frigo
              </th>
              <th role="columnheader" scope="col">
                Box
              </th>
              <th role="columnheader" scope="col">
                Position
              </th>
              <th role="columnheader" scope="col">
                Créé par
              </th>
              <th role="columnheader" scope="col">
                Ajouté le
              </th>
              <th role="columnheader" scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            {samples.length === 0 && (
              <tr role="row">
                <td
                  colSpan="8"
                  style={{ textAlign: "center", color: "#999", padding: "20px" }}
                  role="cell"
                >
                  Aucun échantillon disponible
                </td>
              </tr>
            )}
            {samples.map((s) => (
              <tr key={s._id} role="row" aria-label={`Échantillon ${s.identifiant}`}>
                <td role="cell">
                  <strong>{s.identifiant}</strong>
                </td>
                <td role="cell">{s.categorie}</td>
                <td role="cell">{s.frigoId?.nom || "-"}</td>
                <td role="cell">{s.boxId?.nom || "-"}</td>
                <td role="cell">{s.position}</td>
                <td role="cell" style={{ fontSize: "12px", color: "#0056b3", fontWeight: 500 }}>
                  {s.createdBy?.nom || s.createdBy || "-"}
                </td>
                <td role="cell" title={formatDate(s.createdAt)}>
                  {formatDate(s.createdAt)}
                </td>
                <td role="cell">
                  <button
                    className="btn-small btn-danger"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Êtes-vous sûr de vouloir supprimer l'échantillon ${s.identifiant} ?`
                        )
                      ) {
                        onDelete && onDelete(s._id);
                      }
                    }}
                    aria-label={`Supprimer l'échantillon ${s.identifiant}`}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
