import React, { useEffect, useState } from "react";
import api from "../../api/AxiosConfig";
import DashboardKpis from "../components/DashboardKpis";
import DashboardCharts from "../components/DashboardCharts";
import RecentSamples from "../components/RecentSamples";
import "../styles/Dashboard.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [frigos, setFrigos] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function fetchAll() {
      setLoading(true);
      setError(null);
      try {
        const [resFrigos, resBoxes, resSamples] = await Promise.all([
          api.get("/frigos"),
          api.get("/boxes"),
          api.get("/samples"),
        ]);

        if (!mounted) return;

        setFrigos(resFrigos.data || []);
        setBoxes(resBoxes.data || []);
        setSamples(resSamples.data || []);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les données");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchAll();

    return () => {
      mounted = false;
    };
  }, []);

  // Stats
  const stats = {
    frigos: frigos.length,
    boxes: boxes.length,
    categories: Array.from(new Set(samples.map((s) => s.categorie))).length,
    samples: samples.length,
  };

  // monthly data (last 6 months)
  const monthlyData = (() => {
    const map = new Map();
    samples.forEach((s) => {
      const d = new Date(s.createdAt || s._id?.getTimestamp?.() || Date.now());
      const key = d.toLocaleString("default", { month: "short", year: "numeric" });
      map.set(key, (map.get(key) || 0) + 1);
    });
    const arr = Array.from(map.entries()).map(([month, count]) => ({ month, count }));
    // sort by month order (best-effort by parsing)
    return arr.sort((a, b) => new Date(a.month) - new Date(b.month));
  })();

  // categories data for pie
  const categoriesData = (() => {
    const counts = {};
    samples.forEach((s) => {
      counts[s.categorie] = (counts[s.categorie] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  })();

  // frigo occupancy
  const frigoOccupancy = (() => {
    return frigos.map((f) => {
      const frigoBoxes = boxes.filter((b) => b.frigoId?._id === f._id || b.frigoId === f._id);
      const capacity = frigoBoxes.reduce((s, b) => s + (Number(b.capacite) || 0), 0);
      const occupied = samples.filter((s) => s.frigoId?._id === f._id || s.frigoId === f._id).length;
      const occupancy = capacity > 0 ? Math.round((occupied / capacity) * 100) : 0;
      return { name: f.nom || "-", occupancy };
    });
  })();

  async function handleDeleteSample(id) {
    try {
      await api.delete(`/samples/${id}`);
      // refresh samples
      const res = await api.get("/samples");
      setSamples(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Impossible de supprimer l'échantillon");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Tableau de bord</h2>

      {error && <div style={{ color: "red" }}>{error}</div>}

      <DashboardKpis stats={!loading ? stats : null} />

      <DashboardCharts monthlyData={monthlyData} categoriesData={categoriesData} frigoOccupancy={frigoOccupancy} />

      <RecentSamples samples={samples.slice().sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt)).slice(0,8)} onDelete={handleDeleteSample} />
    </div>
  );
}

export default Home;
