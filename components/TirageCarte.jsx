'use client';

import { useState } from 'react';

const poidsRareté = {
  Commune: 60,
  'Peu commune': 25,
  Rare: 12,
  'Ultra rare': 3
};

function getDateTime() {
  const now = new Date();
  return now.toLocaleString('fr-FR');
}

export default function TirageCarte({ isAdmin, cartes }) {
  const [tirage, setTirage] = useState(null);
  const [historique, setHistorique] = useState([]);

  function tirerCarte() {
    console.log(cartes);

    const cartesPondérées = cartes.flatMap((carte) => Array(poidsRareté[carte.rarete] || 1).fill(carte));
    const index = Math.floor(Math.random() * cartesPondérées.length);
    return cartesPondérées[index];
  }

  const handleTirage = () => {
    const nouvelleCarte = tirerCarte();
    setTirage(nouvelleCarte);
    setHistorique((prev) => [...prev, { ...nouvelleCarte, date: getDateTime() }]);
  };

  const resetHistorique = () => {
    setHistorique([]);
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">🎴 Tirage de Carte</h1>
      <button className="bg-green-600 text-white px-4 py-2 rounded shadow" onClick={handleTirage}>
        Tirer une carte
      </button>

      {tirage && (
        <div className="mt-4 border rounded p-4 bg-white">
          <h2 className="text-xl font-semibold">{tirage.nom}</h2>
          <p>Famille : {tirage.famille}</p>
          <p>Rareté : {tirage.rarete}</p>
        </div>
      )}

      {historique.length > 0 && (
        <div className="mt-6 max-w-md mx-auto text-left">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Historique des tirages</h3>
            {isAdmin && (
              <button onClick={resetHistorique} className="text-sm text-red-600 hover:underline">
                Réinitialiser
              </button>
            )}
          </div>
          <ul className="text-sm bg-white shadow rounded p-2 max-h-60 overflow-y-auto">
            {historique.map((carte, index) => (
              <li key={index} className="border-b py-1">
                [{carte.date}] {carte.nom} – {carte.famille} – {carte.rarete}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
