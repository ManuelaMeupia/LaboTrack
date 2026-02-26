import React from "react";
import "../styles/Dashboard.css";

export default function DashboardKpis({ stats }) {
  const kpiList = [
    { value: stats?.frigos, label: "Frigos", describe: "Nombre total de frigos en stock" },
    { value: stats?.boxes, label: "Boxes", describe: "Nombre total de boxes disponibles" },
    { value: stats?.categories, label: "Catégories", describe: "Nombre de catégories d'échantillons" },
    { value: stats?.samples, label: "Échantillons", describe: "Nombre total d'échantillons stockés" },
  ];

  if (!stats) {
    return (
      <div className="kpis-grid" role="status" aria-live="polite" aria-label="Chargement des statistiques">
        {[1, 2, 3, 4].map((i) => (
          <div className="kpi-card" key={i} aria-busy="true">
            <div className="kpi-value loading" />
            <div className="kpi-label loading" style={{ width: "60%", marginTop: 12 }} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="kpis-grid" role="region" aria-label="Indicateurs clés de performance">
      {kpiList.map((kpi, idx) => (
        <div
          className="kpi-card"
          key={idx}
          role="article"
          aria-describedby={`kpi-desc-${idx}`}
          tabIndex={0}
        >
          <div className="kpi-value" aria-label={`${kpi.label}: ${kpi.value}`}>
            {kpi.value}
          </div>
          <div className="kpi-label" id={`kpi-desc-${idx}`}>
            {kpi.label}
          </div>
          <span style={{ display: "none" }} aria-label={kpi.describe} />
        </div>
      ))}
    </div>
  );
}
