'use client';

import React, { useState, useEffect } from 'react';
import TirageCarte from '../TirageCarte';
import Statistiques from '../Statistiques';
import Loader from '../Loader';

export default function AdminPage() {
  const [cartes, setCartes] = useState([]);
  const [historique, setHistorique] = useState([]);

  const [loadingHistorique, setLoadingHistorique] = useState(true);
  const [loadingCartes, setLoadingCartes] = useState(true);

  useEffect(() => {
    fetch('/api/get-cartes')
      .then((response) => response.json())
      .then((data) => {
        setCartes(data.cartes);
        setLoadingCartes(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(refreshHistorique, 5000);

    return () => clearInterval(interval);
  }, []);

  const refreshHistorique = async () => {
    const data = await fetch('/api/get-historique');

    const { historique } = await data.json();

    setHistorique(historique);
    setLoadingHistorique(false);
  };

  if (loadingCartes) {
    return (
      <>
        <Loader />
        <div className="text-center text-2xl font-bold">Chargement des cartes...</div>
      </>
    );
  }

  console.log(cartes);

  return (
    <>
        <TirageCarte isAdmin={true} cartes={cartes} historique={historique} handleRefreshHistorique={refreshHistorique} loadingHistorique={loadingHistorique} />
        <Statistiques cartes={cartes} historique={historique} handleRefreshHistorique={refreshHistorique} loadingHistorique={loadingHistorique} />
    </>
  );
}
