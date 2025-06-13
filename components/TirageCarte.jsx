'use client';

import { useState } from 'react';
import Loader from './Loader';

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

export default function TirageCarte({ isAdmin, cartes, historique, handleRefreshHistorique, loadingHistorique }) {
  const [tirage, setTirage] = useState(null);

  const addToHistorique = async (nouvelleCarte) => {
    await fetch('/api/add-to-historique', {
      method: 'POST',
      body: JSON.stringify({
        carte_id: nouvelleCarte.id,
        date: getDateTime()
      })
    });
  };

  function tirerCarte() {
    const generatedRarete = Math.floor(Math.random() * 100) + 1;

    let rarete = 'Commune';

    if (generatedRarete <= poidsRareté.Commune) {
      rarete = 'Commune';
    } else if (generatedRarete <= poidsRareté['Peu commune'] + poidsRareté.Commune) {
      rarete = 'Peu commune';
    } else if (generatedRarete <= poidsRareté.Rare + poidsRareté['Peu commune'] + poidsRareté.Commune) {
      rarete = 'Rare';
    } else {
      rarete = 'Ultra rare'; // 3%
    }

    const cartesMatchingRarete = cartes.filter((carte) => carte.rarete === rarete);

    const index = Math.floor(Math.random() * cartesMatchingRarete.length);

    return cartesMatchingRarete[index];
  }

  const handleTirage = async () => {
    const nouvelleCarte = tirerCarte();
    setTirage(nouvelleCarte);
    await addToHistorique(nouvelleCarte);
    await handleRefreshHistorique();
  };

  const resetHistorique = async () => {
    const confirm = window.confirm('Voulez-vous vraiment réinitialiser l\'historique ?');

    if (!confirm) {
      return;
    }

    await fetch('/api/reset-historique', {
      method: 'POST'
    });

    await handleRefreshHistorique();
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">🎴 Tirage de Carte</h1>
      <button className="bg-green-600 text-white px-4 py-2 rounded shadow" onClick={handleTirage}>
        Tirer une carte
      </button>

      {tirage && (
        <div className="mt-4 border rounded p-4 bg-white text-center justify-self-center">
          <img src={tirage.path} alt={tirage.nom} className="justify-self-center" style={{ height: '50vh'}} />
          <h2 className="text-xl font-semibold">{tirage.nom}</h2>
          <p>Famille : {tirage.famille}</p>
          <p>Rareté : {tirage.rarete}</p>
          <p>URL: {window.location.origin}{tirage.path}</p>
        </div>
      )}

      {loadingHistorique && (
        <div className="mt-6 max-w-md mx-auto text-left">
          <div className="flex justify-between items-center mb-2">
            <Loader />
            <div className="text-center text-2xl font-bold">Chargement de l'historique...</div>
          </div>
        </div>
      )}

      {historique.length > 0 && !loadingHistorique && (
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
            {historique.map((carte, index) => {
              const carteData = cartes.find((c) => c.id === carte.carte_id);

              if (!carteData) {
                return null;
              }

              return (
                <li key={index} className="border-b py-1">
                    [{carte.date}] {carteData.name} – {carteData.famille} – {carteData.rarete}
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
}
