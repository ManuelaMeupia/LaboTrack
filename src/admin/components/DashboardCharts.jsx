import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import "../styles/Dashboard.css";

const COLORS = ["#1976d2", "#ff9800", "#4caf50", "#d32f2f", "#6c757d", "#9c27b0"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "white",
          border: "1px solid #ddd",
          borderRadius: "6px",
          padding: "8px 12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "#052c65" }}>
          {payload[0].name}: <span style={{ color: payload[0].fill }}>{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const percentage = payload[0].payload.percentage || ((payload[0].value / 100) * 100).toFixed(1);
    return (
      <div
        style={{
          background: "white",
          border: "1px solid #ddd",
          borderRadius: "6px",
          padding: "8px 12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "#052c65" }}>
          {payload[0].name}
        </p>
        <p style={{ margin: "4px 0 0 0", fontSize: 12, color: "#666" }}>
          {payload[0].value} (≈ {percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

export default function DashboardCharts({
  monthlyData = [],
  categoriesData = [],
  frigoOccupancy = [],
}) {
  return (
    <div className="charts-grid">
      <div className="chart-card" role="region" aria-label="Graphique des échantillons par mois">
        <h4>Échantillons par mois</h4>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <XAxis dataKey="month" stroke="#999" style={{ fontSize: 12 }} />
            <YAxis stroke="#999" style={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#1976d2"
              strokeWidth={2.5}
              dot={false}
              isAnimationActive={true}
              animationDuration={500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card" role="region" aria-label="Répartition des échantillons par catégorie">
        <h4>Répartition par catégorie</h4>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={categoriesData}
              dataKey="value"
              nameKey="name"
              innerRadius={45}
              outerRadius={75}
              label={false}
              startAngle={90}
              endAngle={-270}
              isAnimationActive={true}
              animationDuration={500}
            >
              {categoriesData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  opacity={0.9}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomPieTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={30}
              wrapperStyle={{ paddingTop: 10 }}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div
        className="chart-card full-width"
        role="region"
        aria-label="Taux d'occupation par frigo"
      >
        <h4>Taux d'occupation par frigo (%)</h4>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={frigoOccupancy} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" stroke="#999" style={{ fontSize: 12 }} />
            <YAxis
              stroke="#999"
              style={{ fontSize: 12 }}
              unit="%"
              domain={[0, 100]}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div
                      style={{
                        background: "white",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        padding: "8px 12px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      }}
                    >
                      <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "#052c65" }}>
                        {payload[0].payload.name}
                      </p>
                      <p style={{ margin: "4px 0 0 0", fontSize: 12, color: "#4caf50" }}>
                        {payload[0].value}% occupé
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="occupancy"
              fill="#4caf50"
              radius={[8, 8, 0, 0]}
              isAnimationActive={true}
              animationDuration={500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
