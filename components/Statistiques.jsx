
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const couleurs = {
  "Commune": "#8884d8",
  "Peu commune": "#82ca9d",
  "Rare": "#ffc658",
  "Ultra rare": "#d84c6f"
};

function countByRarity(hist) {
  const counts = {};
  hist.forEach((entry) => {
    counts[entry.rarete] = (counts[entry.rarete] || 0) + 1;
  });
  return Object.entries(counts).map(([rarete, value]) => ({ name: rarete, value }));
}

export default function Statistiques() {
  const [historique, setHistorique] = useState([]);

  useEffect(() => {
    // No persistent storage yet, assume session-only
  }, []);

  return (
    <div className="p-4 mt-10 bg-white max-w-xl mx-auto rounded shadow">
      <h2 className="text-xl font-bold mb-4">📊 Statistiques des tirages</h2>
      {historique.length === 0 ? (
        <p className="text-gray-600">Aucun tirage encore effectué.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={countByRarity(historique)}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {countByRarity(historique).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={couleurs[entry.name]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
