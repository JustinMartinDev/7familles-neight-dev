'use client';

import { useMode } from '../../context/ModeContext';
import React from 'react';

export default function DefaultPage() {
  const { setPassword } = useMode();

  const onClick = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get('password');

    console.log(password);
    setPassword(password);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Accès sécurisé</h1>
      <form onSubmit={onClick}>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="Mot de passe" className="border px-4 ml-2 rounded" />

        <div className="mt-2">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
            Connexion
          </button>
        </div>
      </form>
    </>
  );
}
