import React from "react";
import DashboardKpis from "../components/DashboardKpis";
import DashboardCharts from "../components/DashboardCharts";
import RecentSamples from "../components/RecentSamples";

// Mock data for demo
const frigos = [
  { _id: "f1", nom: "Frigo A" },
  { _id: "f2", nom: "Frigo B" },
  { _id: "f3", nom: "Frigo C" },
];

const boxes = [
  { _id: "b1", nom: "Box 1", frigoId: { _id: "f1" }, capacite: 96 },
  { _id: "b2", nom: "Box 2", frigoId: { _id: "f1" }, capacite: 48 },
  { _id: "b3", nom: "Box 3", frigoId: { _id: "f2" }, capacite: 96 },
];

const now = Date.now();
const samples = [
  {
    _id: "s1",
    identifiant: "SAMP-001",
    categorie: "Sang",
    sexe: "Masculin",
    age: 34,
    localite: "Yaoundé",
    communaute: "Commune 1",
    frigoId: frigos[0],
    boxId: boxes[0],
    position: 12,
    createdBy: { _id: "u1", nom: "Admin" },
    createdAt: new Date(now - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    _id: "s2",
    identifiant: "SAMP-002",
    categorie: "Urine",
    sexe: "Féminin",
    age: 28,
    localite: "Douala",
    communaute: "Commune 2",
    frigoId: frigos[1],
    boxId: boxes[2],
    position: 5,
    createdBy: { _id: "u2", nom: "Technicien" },
    createdAt: new Date(now - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    _id: "s3",
    identifiant: "SAMP-003",
    categorie: "Plasma",
    sexe: "Masculin",
    age: 45,
    localite: "Bafoussam",
    communaute: "Commune 3",
    frigoId: frigos[2],
    boxId: boxes[1],
    position: 33,
    createdBy: { _id: "u1", nom: "Admin" },
    createdAt: new Date(now - 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
];

const monthlyData = [
  { month: "Nov 2025", count: 12 },
  { month: "Déc 2025", count: 24 },
  { month: "Jan 2026", count: 38 },
  { month: "Fév 2026", count: 16 },
];

const categoriesData = [
  { name: "Sang", value: 45 },
  { name: "Plasma", value: 25 },
  { name: "Urine", value: 20 },
  { name: "Autres", value: 10 },
];

const frigoOccupancy = [
  { name: "Frigo A", occupancy: 72 },
  { name: "Frigo B", occupancy: 44 },
  { name: "Frigo C", occupancy: 58 },
];

export default function HomeDemo() {
  const stats = {
    frigos: frigos.length,
    boxes: boxes.length,
    categories: categoriesData.length,
    samples: samples.length,
  };

  function handleDelete(id) {
    // demo: simulate delete by alert
    alert(`Demo: suppression simulée de ${id}`);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Tableau de bord - Mode Démo</h2>

      <DashboardKpis stats={stats} />

      <DashboardCharts monthlyData={monthlyData} categoriesData={categoriesData} frigoOccupancy={frigoOccupancy} />

      <RecentSamples samples={samples} onDelete={handleDelete} />
    </div>
  );
}
