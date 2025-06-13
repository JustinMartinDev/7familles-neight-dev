import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import Loader from './Loader';

const couleurs = {
  Commune: '#808080', //Gris
  'Peu commune': '#008000', //Vert
  Rare: '#0000FF', //Bleu
  'Ultra rare': '#FFD700' //Gold
};

const familles = {
  DOJ: '#808080', //Gris
  SASP: '#0000FF', //Bleu
  'Morticians MC': '#000000', //Noir
  '21 Shady': '#b8b8a7', //Beige
  Nomads: '#008000', //Vert
  'Les BOSS': '#FFD700', //Jaune
  SAMD: '#FF0000', //Rouge
};

function countByRarity(historique, cartes) {
  const counts = {};
  historique.forEach((entry) => {
    const carte = cartes.find((c) => c.id === entry.carte_id);

    if (!carte) {
      return;
    }

    counts[carte.rarete] = (counts[carte.rarete] || 0) + 1;
  });

  return Object.entries(counts).map(([rarete, value]) => ({ name: rarete, value }));
}


function countByFamille(historique, cartes) {
  const counts = {};
  historique.forEach((entry) => {
    const carte = cartes.find((c) => c.id === entry.carte_id);

    if (!carte) {
      return;
    }

    counts[carte.famille] = (counts[carte.famille] || 0) + 1;
  });

  return Object.entries(counts).map(([famille, value]) => ({ name: famille, value }));
}


export default function Statistiques({ cartes, historique, handleRefreshHistorique, loadingHistorique }) {
  return (
    <div className="p-4 mt-10 bg-white max-w-xl mx-auto rounded shadow" style={{
      paddingBottom: '4vh',
      marginBottom: '5vh'
    }}>
      <h2 className="text-xl font-bold mb-4">📊 Statistiques des tirages</h2>

      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleRefreshHistorique}>Rafraîchir</button>

      {loadingHistorique && (
        <div className="mt-6 max-w-md mx-auto text-left">
          <div className="flex justify-between items-center mb-2">
            <Loader />
            <div className="text-center text-2xl font-bold">Chargement des statistiques...</div>
          </div>
        </div>
      )}

      {historique.length === 0 && !loadingHistorique ? (
        <p className="text-gray-600">Aucun tirage encore effectué.</p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <div className="text-center underline underline-offset-8 mt-2">
              Répartition des raretés parmis les cartes tirées
            </div>
            <PieChart>
              <Pie
                data={countByRarity(historique, cartes)}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
              >
                {countByRarity(historique, cartes).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={couleurs[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
       
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height={300} style={{marginTop: '7vh'}}>
            <div className="text-center underline underline-offset-8">
              Répartition des familles parmis les cartes tirées
            </div>
            <PieChart>
              <Pie
                data={countByFamille(historique, cartes)}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
              >
                {countByFamille(historique, cartes).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={familles[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}
